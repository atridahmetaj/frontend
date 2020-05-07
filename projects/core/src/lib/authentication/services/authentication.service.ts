import { Injectable, Inject } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

import { AUTHENTICATION_CONFIGURATION, IAuthenticationConfig } from '../authentification.config';
import { Login } from '../models/login';
import { AUTHENTICATION_STORE } from '../authentication.constants';
import { Observable } from 'rxjs';
import { AuthenticationStore } from '../models/authentication-store';
import { select } from '@angular-redux/store';

@Injectable()
export class AuthenticationService {
    @select([AUTHENTICATION_STORE, 'user']) auth$: Observable<AuthenticationStore>;
    currentUser: any;

    constructor(private http: HttpClient, @Inject(AUTHENTICATION_CONFIGURATION) private config: IAuthenticationConfig) {
        this.auth$.subscribe((user: any) => {
            if (user) {
                this.currentUser = user;
            }
        });

    }

    token(login: Login) {
        const url = this.config.url;
        return this.http.post<Login>(`${url}/login`, login);
    }

}
