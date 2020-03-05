
import { NgReduxRouter } from '@angular-redux/router';
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';


import { ReduxInitUtils } from '../../../utils/redux-init.utils';


@Injectable({
    providedIn: 'root'
  })
  export class ReduxInitService {
  
  
    constructor() {
    } 
  
    //TO-DO Remove any type from environment
    static initRedux(environment: any,
                     ngRedux: NgRedux<any>,
                     devTools: DevToolsExtension,
                     ngReduxRouter: NgReduxRouter,
                     enabledReduxReducers: any = [],
                     enabledReduxStates: any = [],
                     enabledMiddlewares: any[] = [],
                     enhancers: any = []) {
  
      if (!environment.production && devTools.isEnabled()) {
        enhancers = [
          ...enhancers,
          devTools.enhancer()
        ];
      }
  
      const reducers = ReduxInitUtils.getInitialReducers([
        ...enabledReduxReducers
      ]);
      const states = ReduxInitUtils.getInitialState([
        ...enabledReduxStates
      ]);
  
      ngRedux.configureStore(reducers, states, [...enabledMiddlewares], enhancers);
  
      ngReduxRouter.initialize(/* args */);
    }
  
  
  
  }
  