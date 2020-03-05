import { MessageService } from "primeng/api";
import { AnyAction, Action } from "redux";
import {
  ActionsObservable,
  ofType,
  StateObservable
} from "redux-observable-es6-compat";
import { Observable, of, merge } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";

import { ReduxCrudStore } from "./redux-crud.store";
import { BaseEntityModel } from "../../../base/model/base-entity.model";
import { ReduxCrudActions } from "./redux-crud.actions";
import { ReduxActionModel } from "../../model/redux-action.model";
import { BaseEntityService } from "../../../base/services/base-entity.service";
import { SUCCESS_MESSAGE } from "./redux-crud.constants";

export interface IReduxCrudEpics {
  stateName: string;

  initializeCreate: (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ) => Observable<Action>;

  initializeUpdate: (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ) => Observable<AnyAction>;

  doCreate: (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ) => Observable<Action>;

  doUpdate: (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ) => Observable<Action>;
}

export abstract class ReduxCrudEpics<
  Entity extends BaseEntityModel,
  Store extends ReduxCrudStore<Entity>,
  Actions extends ReduxCrudActions<Entity>
  > implements IReduxCrudEpics {
  protected constructor(
    public apiService: BaseEntityService<Entity>,
    public action: Actions,
    private message: MessageService
  ) {

  }
  abstract stateName: string;

  combineEpic = (action$, state$): Observable<AnyAction> =>
    merge(
      this.initializeCreate(action$, state$),
      this.initializeUpdate(action$, state$),
      this.doCreate(action$, state$),
      this.doUpdate(action$, state$)
    );

  initializeCreate = (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ): Observable<Action> => {
    return action$.pipe(
      ofType(this.action.INITIALIZE_CREATE),
      mergeMap((value: Action) => {
        const action: Action = {
          type: this.action.INITIALIZE_CREATE_DONE
        };
        return of(action);
      })
    );
  };

  initializeUpdate = (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ): Observable<AnyAction> => {
    return action$.pipe(
      ofType(this.action.INITIALIZE_UPDATE, this.action.DO_REFRESH),
      mergeMap((value: ReduxActionModel<string>) => {
        const state: ReduxCrudStore<Entity> = { ...state$.value[this.stateName] };
        return this.apiService.readAsync(state.entity.id as string).pipe(
          map((result: HttpResponse<Entity>) => {
            const action: ReduxActionModel<Entity> = {
              type: this.action.INITIALIZE_UPDATE_SUCCESS,
              payload: result.body
            };
            return action;
          }),
          catchError(error => {
            return of({
              type: this.action.INITIALIZE_UPDATE_FAIL
            });
          })
        );
      })
    );
  };

  doUpdate = (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ): Observable<Action> => {
    return action$.pipe(
      ofType(this.action.DO_UPDATE),
      mergeMap((_: ReduxActionModel<Entity>) => {
        const state: Store = { ...state$.value[this.stateName] };
        return this.apiService.updateAsync(state.entity).pipe(
          map((result: HttpResponse<void>) => {
            this.message.add(SUCCESS_MESSAGE);
            return {
              type: this.action.DO_UPDATE_SUCCESS
            };
          }),
          catchError(_ => {
            return of({
              type: this.action.DO_UPDATE_SUCCESS
            });
          })
        );
      })
    );
  };

  doCreate = (
    action$: ActionsObservable<any>,
    state$: StateObservable<void>
  ): Observable<Action> => {
    return action$.pipe(
      ofType(this.action.DO_CREATE),
      mergeMap((_: ReduxActionModel<Entity>) => {
        const state: Store = { ...state$.value[this.stateName] };
        return this.apiService.createAsync(state.entity).pipe(
          map((result: HttpResponse<string>) => {
            this.message.add(SUCCESS_MESSAGE);
            return {
              type: this.action.DO_CREATE_SUCCESS,
              payload: result.body
            };
          }),
          catchError(_ => {
            return of({
              type: this.action.DO_CREATE_FAIL
            });
          })
        );
      })
    );
  };
}
