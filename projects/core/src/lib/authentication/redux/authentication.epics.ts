import { ActionsObservable, StateObservable, ofType } from 'redux-observable-es6-compat';
import { Observable, of, merge } from 'rxjs';
import { AnyAction, Action } from 'redux';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Login } from './../models/login';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationActions } from './authentication.actions';
import { ReduxActionModel } from '../../redux/model/redux-action.model';
import { AUTHENTICATION_STORE } from '../authentication.constants';



@Injectable({
    providedIn: 'root'
})
export class AuthenticationEpics {

    stateName: string = AUTHENTICATION_STORE;

    constructor(private authenticationService: AuthenticationService, private router: Router,
                private messageService: MessageService) { }

    combineEpic = (action$: ActionsObservable<any>,
                   state$: StateObservable<void>): Observable<AnyAction> => merge(
            this.doLogin(action$, state$),
            this.doRefresh(action$, state$))

    doRefresh = (action$: ActionsObservable<any>, state$: StateObservable<void>): Observable<AnyAction> => {
        return action$.pipe(
            ofType(AuthenticationActions.REFRESH),
            map((result: Action<string>) => {
                let token = sessionStorage.getItem('token');
                if (token) {
                    // TO-DO Decode the token :D
                    token = token;
                }
                return {
                    type: AuthenticationActions.REFRESH_DONE,
                    payload: token
                };
            })
        );
    }

    doLogin(action$: ActionsObservable<any>, state$: StateObservable<void>): Observable<AnyAction> {
        return action$.pipe(
            ofType(AuthenticationActions.LOGIN),
            mergeMap((value: ReduxActionModel<Login>) => {
                console.log(value.payload);
                return this.authenticationService.token(value.payload).pipe(
                    map((result: any) => {
                        sessionStorage.setItem(
                            'token',
                            result.access_token
                        );
                        this.router.navigate(['/ms/admin']);
                        // TO-DO Decode the token :D
                        return {
                            type: AuthenticationActions.LOGIN_SUCCESS,
                            payload: result.access_token
                        };
                    }),
                    catchError(error => {
                        return of({
                            type: AuthenticationActions.LOGIN_FAIL
                        });
                    })
                );
            })
        );
    }
}
