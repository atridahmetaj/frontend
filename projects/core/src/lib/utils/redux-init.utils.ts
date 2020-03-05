import {combineReducers} from 'redux';

export class ReduxInitUtils {
    static getInitialState(states: any[]): any {
        let ret = {};

        states.forEach((state) => {
            ret = { ...ret, ...state };
        });  

        return ret;
    }

    static getInitialReducers(reducers: any[]): any {
        let ret = {};

        reducers.forEach((state) => {
            ret = { ...ret, ...state };
        });

        return combineReducers<any>(ret);
    }
}  