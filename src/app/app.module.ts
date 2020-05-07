import { CommonsModule } from '@ms-system/commons';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  routerReducer,
  NgReduxRouter,
  NgReduxRouterModule
} from '@angular-redux/router';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { DevToolsExtension } from '@angular-redux/store';
import { AnyAction } from 'redux';
import {
  combineEpics,
  createEpicMiddleware
} from 'redux-observable-es6-compat';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  AuthenticationModule,
  TokenInterceptor,
  ReduxAppModule,
  ReduxInitService,
  CoreModule,
  ExceptionModule,
  HttpErrorInterceptor,
  AUTH_REDUCER_LOADERS
} from '@ms-system/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReduxEpicsService } from 'src/app/redux-epics.service';
import { environment } from 'src/environments/environment';
import { APP_CONFIGURATIONS_PROVIDERS } from './app-configuration.providers';
import { LayoutModule } from '@ms-system/layout';
import { AdminModule } from '@ms-system/admin';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    LayoutModule,
    AdminModule,
    ExceptionModule,
    CommonsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AuthenticationModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    NgReduxModule,
    NgReduxRouterModule.forRoot()
  ],
  providers: [
    ...APP_CONFIGURATIONS_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ReduxEpicsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule extends ReduxAppModule {
  constructor(
    reduxInit: ReduxInitService,
    ngRedux: NgRedux<any>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    private epics: ReduxEpicsService
  ) {
    super(reduxInit, ngRedux, devTools, ngReduxRouter);

    const epicArr = this.epics.combineEpic;
    const rootEpic = combineEpics<AnyAction, any>(epicArr);
    // tslint:disable-next-line: no-use-before-declare
    epicMiddleware.run(rootEpic);
  }

  getEnvironment(): any {
    return environment;
  }

  getReduxReducers(): any[] {
    return [
      ...AUTH_REDUCER_LOADERS,
      { router: routerReducer }
    ];
  }

  getReduxStates(): any[] {
    return [];
  }

  getReduxMiddlewares(): any[] {
    return [epicMiddleware];
  }

  getReduxEnhancers(): any[] {
    return [];
  }
}

const epicMiddleware = createEpicMiddleware();
