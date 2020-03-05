import { ReduxCrudStore } from "./redux-crud.store";
import { IReduxCrudActions } from "./redux-crud.actions";
import { ReduxActionModel } from "../../model/redux-action.model";
import { BaseEntityModel } from "../../../base/model/base-entity.model";
import { TypescriptUtils } from "../../../utils/typescript.utils";
import { ReduxModelState } from "../../model/redux-model-state.enum";

export interface IReduxCrudReducer<
  Entity extends BaseEntityModel,
  State extends ReduxCrudStore<Entity>
  > {
  getStoreInitialState: () => State;
}

export abstract class ReduxCrudReducer<
  Entity extends BaseEntityModel,
  State extends ReduxCrudStore<Entity>,
  Actions extends IReduxCrudActions<Entity>
  > implements IReduxCrudReducer<Entity,State> {
  actions: Actions;

  protected constructor(actions: Actions) {
    this.actions = actions;
  }

  abstract getStoreInitialState: () => State;

  protected _reducer(state: State, action: ReduxActionModel<any>): State {
    switch (action.type) {
      case this.actions.INITIALIZE_CREATE:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          modelState: ReduxModelState.CREATE,
          entity: null
        });
      case this.actions.INITIALIZE_UPDATE:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          modelState: ReduxModelState.UPDATE,
          entity: { id: action.payload }
        });
      case this.actions.INITIALIZE_UPDATE_SUCCESS:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          modelState: ReduxModelState.UPDATE,
          entity: action.payload
        });
      case this.actions.INITIALIZE_UPDATE_FAIL:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type
        });
      case this.actions.DO_CREATE:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          entity: action.payload
        });
      case this.actions.DO_CREATE_FAIL:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type
        });
      case this.actions.DO_CREATE_SUCCESS:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          entity: null
        });
      case this.actions.DO_UPDATE:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          entity: action.payload
        });
      case this.actions.DO_UPDATE_SUCCESS:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type,
          entity: null
        });
      case this.actions.DO_UPDATE_FAIL:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type
        });
      default:
        return TypescriptUtils.newInstanceObjectAssign(state, {
          lastOperation: action.type
        });
    }
  }
}
