import { Injectable, Inject } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

import { AUTHENTICATION_CONFIGURATION, IAuthenticationConfig } from '../authentification.config';
import { Login } from '../models/login';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, @Inject(AUTHENTICATION_CONFIGURATION) private config: IAuthenticationConfig) {

    }

    token(login: Login) {
        return this.http.post<Login>(this.config.url, login);
    }

}