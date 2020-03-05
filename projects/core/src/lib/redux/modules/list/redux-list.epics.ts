import { MessageService } from "primeng/api";
import { AnyAction } from "redux";
import {
  ActionsObservable,
  ofType,
  StateObservable
} from "redux-observable-es6-compat";
import { Observable, of, merge } from "rxjs";
import { mergeMap, map, catchError, tap } from "rxjs/operators";

import { ReduxListStore } from "./redux-list.store";
import { BaseEntityModel } from "../../../base/model/base-entity.model";
import { BaseFormModel } from "../../../base/model/base-form.model";
import { BaseEntityService } from "../../../base/services/base-entity.service";
import { IReduxListActions } from "./redux-list.actions";
import { ReduxActionModel } from "../../model/redux-action.model";
import { SUCCESS_STATUS_CHANGE_MESSAGE } from "./redux-list.constants";

export interface IReduxListEpics {
  stateName: string;
  search: (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ) => Observable<AnyAction>;

}

export abstract class ReduxListEpics<
  Store extends ReduxListStore<Entity>,
  Form extends BaseFormModel,
  Entity extends BaseEntityModel,
  Actions extends IReduxListActions<Form, Entity>
  > implements IReduxListEpics {
  protected constructor(
    public apiService: BaseEntityService<Entity>,
    public action: Actions,
    private message: MessageService
  ) { }
  abstract stateName: string;

  combineEpic = (action$, state$): Observable<AnyAction> =>
    merge(
      this.search(action$, state$),
      this.doDelete(action$, state$)
    );

  search = (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ): Observable<any> => {
    return action$.pipe(
      ofType(this.action.DO_SEARCH),
      mergeMap((value: ReduxActionModel<Store>) => {
        return this.apiService.searchAsync().pipe(
          map((result: any) => {
            return {
              type: this.action.DO_SEARCH_SUCCESS,
              payload: result.body
            };
          }),
          catchError(error => {
            return of({
              type: this.action.DO_SEARCH_FAIL
            });
          })
        );
      })
    );
  };



  doDelete = (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ): Observable<any> => {
    return action$.pipe(
      ofType(this.action.DO_DELETE),
      mergeMap((value: ReduxActionModel<Entity>) => {
        return this.apiService.deleteAsync(value.payload.id).pipe(
          map((result: any) => {
            this.message.addAll([SUCCESS_STATUS_CHANGE_MESSAGE]);
            return {
              type: this.action.DO_DELETE_SUCCESS
            };
          }),
          catchError(error => {
            return of({
              type: this.action.DO_DELETE_FAIL
            });
          })
        );
      }),
      tap(_ => {
        this.action.doSearch();
      })
    );
  };
}
