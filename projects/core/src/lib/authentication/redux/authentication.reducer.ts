import { AuthenticationActions } from './authentication.actions';
import { AuthenticationStore } from '../models/authentication-store';
import { ReduxActionModel } from '../../redux/model/redux-action.model';
import { AUTHENTICATION_STORE } from '../authentication.constants';


export class AuthenticationReducer {
  public static INITIAL_STATE: AuthenticationStore = {};

  public static reducer(state: AuthenticationStore = AuthenticationReducer.INITIAL_STATE, action: ReduxActionModel<any>): AuthenticationStore {
    return new AuthenticationReducer()._reducer(state, action);
  }

  private _reducer = (state: AuthenticationStore, action: ReduxActionModel<any>): AuthenticationStore => {
    switch (action.type) {

      case AuthenticationActions.LOGIN:
        return {
          ...state
        };
      case AuthenticationActions.LOGIN_SUCCESS:
        return {
          ...state,
          userToken: action.payload
        };
        case AuthenticationActions.REFRESH_DONE:
        return {
          ...state,
          userToken: action.payload
        };
      default:
        return state;
    }
  }
}

export const AuthenticationReducerLoader = {
  [AUTHENTICATION_STORE]: AuthenticationReducer.reducer
};
