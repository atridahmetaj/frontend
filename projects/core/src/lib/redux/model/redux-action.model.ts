import { Action } from 'redux';


export interface ReduxActionModel<T> extends Action {
    payload?: T;

    [key: string]: any; 
}
