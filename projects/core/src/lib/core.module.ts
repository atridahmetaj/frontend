import { CommonsModule } from '@ms-system/commons';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReduxInitService } from './redux/modules/app/redux-init.service';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [],
  imports: [
    CommonsModule,
    RouterModule
  ],
  providers: [ReduxInitService],
  exports: []
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ReduxInitService, MessageService]
    };
  }
 }
