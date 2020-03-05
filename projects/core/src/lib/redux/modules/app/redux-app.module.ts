
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouter } from '@angular-redux/router';

import { ReduxInitService } from './redux-init.service';


export abstract class ReduxAppModule {

    // TO-DO Remove any type from getEnvironment()
    abstract getEnvironment(): any;

    abstract getReduxReducers(): any[];

    abstract getReduxStates(): any[];

    abstract getReduxMiddlewares(): any[];

    abstract getReduxEnhancers(): any[];

    constructor(init: ReduxInitService, ngRedux: NgRedux<any>, devTools: DevToolsExtension, ngReduxRouter: NgReduxRouter) {
        ReduxInitService.initRedux(this.getEnvironment(), ngRedux, devTools, ngReduxRouter,
            this.getReduxReducers(), this.getReduxStates(), this.getReduxMiddlewares(), this.getReduxEnhancers());
    }
}
