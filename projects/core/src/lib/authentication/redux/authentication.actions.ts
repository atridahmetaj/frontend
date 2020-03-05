import { dispatch } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { Action } from "redux";

import { Login } from "../models";
import { ReduxActionModel } from "../../redux/model/redux-action.model";
import { AUTHENTICATION_STORE } from "../authentication.constants";

@Injectable({
  providedIn: "root"
})
export class AuthenticationActions {
  static LOGIN = `[${AUTHENTICATION_STORE}] LOGIN`;
  static LOGIN_SUCCESS = `[${AUTHENTICATION_STORE}] LOGIN_SUCCESS`;
  static LOGIN_FAIL = `[${AUTHENTICATION_STORE}] LOGIN_FAILED`;
  static LOGOUT = `[${AUTHENTICATION_STORE}] LOGOUT`;
  static LOGOUT_SUCCESS = `[${AUTHENTICATION_STORE}] LOGOUT_DONE`;
  static REFRESH = `[${AUTHENTICATION_STORE}] REFRESH`;
  static REFRESH_DONE = `[${AUTHENTICATION_STORE}] REFRESH_DONE`;

  
  @dispatch() login(loginForm: Login): ReduxActionModel<Login> {
    return {
      type: AuthenticationActions.LOGIN,
      payload: loginForm
    };
  }

  @dispatch() logout(): Action<string> {
    return {
      type: AuthenticationActions.LOGOUT
    };
  }

  @dispatch() doRefresh(): Action<string> {
    return {
      type: AuthenticationActions.REFRESH
    };
  }
}
