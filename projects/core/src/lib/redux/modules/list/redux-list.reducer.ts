import { ReduxActionModel } from "../../model/redux-action.model";
import { TypescriptUtils } from "../../../utils/typescript.utils";
import { ReduxListStore } from "./redux-list.store";
import { IReduxListActions } from "./redux-list.actions";
import { BaseFormModel } from "../../../base/model/base-form.model";
import { BaseEntityModel } from "../../../base/model/base-entity.model";

export interface IReduxListReducer<
  State extends ReduxListStore<Entity>,
  Entity extends BaseEntityModel
  > {
  getStoreInitialState: () => State;
}

export abstract class ReduxListReducer<
  State extends ReduxListStore<Model>,
  Model extends BaseEntityModel,
  Form extends BaseFormModel,
  Actions extends IReduxListActions<Form, Model>
  > implements IReduxListReducer<State, Model> {
  actions: Actions;

  protected constructor(actions: Actions) {
    this.actions = actions;
  }

  abstract getStoreInitialState: () => State;

  protected _reducer(state: State, action: ReduxActionModel<any>): State {
    switch (action.type) {
      case this.actions.DO_SEARCH_SUCCESS:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          list: action.payload,
          isLoading: false
        });
      case this.actions.DO_SEARCH_FAIL:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          isLoading: false
        });
      case this.actions.DO_SEARCH:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          isLoading: true
        });
      case this.actions.DO_DELETE:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          isLoading: true
        });
      default:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type
        });
    }
  }
}
