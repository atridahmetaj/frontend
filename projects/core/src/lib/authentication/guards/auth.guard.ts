import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

//NOTE: Partly done :D
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor() {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = sessionStorage.getItem('token');
        if (token) {
            return true;
        }
        return false;
    }
}