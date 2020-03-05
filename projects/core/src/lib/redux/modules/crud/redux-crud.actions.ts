import { Action } from "redux";
import { dispatch } from "@angular-redux/store";

import { BaseFormModel } from "./../../../base/model/base-form.model";
import { ReduxActionModel } from "../../model/redux-action.model";
import { BaseEntityModel } from "../../../base/model/base-entity.model";

export interface IReduxCrudActions<
  Entity extends BaseEntityModel
  > {
  stateName: string;
  INITIALIZE_CREATE: string;
  INITIALIZE_CREATE_DONE: string;
  DO_CREATE: string;
  DO_CREATE_SUCCESS: string;
  DO_CREATE_FAIL: string;
  INITIALIZE_UPDATE: string;
  INITIALIZE_UPDATE_SUCCESS: string;
  INITIALIZE_UPDATE_FAIL: string;
  DO_UPDATE: string;
  DO_UPDATE_SUCCESS: string;
  DO_UPDATE_FAIL: string;
  initializeCreate: () => Action;
  initializeUpdate: (id: string) => ReduxActionModel<string>;
  doCreate: (entity: Entity) => ReduxActionModel<Entity>;
  doUpdate: (entity: Entity) => ReduxActionModel<Entity>;
}

export abstract class ReduxCrudActions<
  Entity extends BaseEntityModel
  > implements IReduxCrudActions<Entity> {
  stateName: string;
  INITIALIZE_CREATE: string;
  INITIALIZE_CREATE_DONE: string;
  DO_CREATE: string;
  DO_CREATE_SUCCESS: string;
  DO_CREATE_FAIL: string;
  INITIALIZE_UPDATE: string;
  INITIALIZE_UPDATE_SUCCESS: string;
  INITIALIZE_UPDATE_FAIL: string;
  DO_UPDATE: string;
  DO_UPDATE_SUCCESS: string;
  DO_UPDATE_FAIL: string;
  DO_REFRESH: string;

  protected constructor(stateName: string) {
    this.stateName = stateName;
    this._initializeStateActions();
  }

  private _initializeStateActions(): void {
    this.INITIALIZE_CREATE = `[${this.stateName}] INITIALIZE_CREATE`;
    this.INITIALIZE_CREATE_DONE = `[${this.stateName}] INITIALIZE_CREATE_DONE`;
    this.INITIALIZE_UPDATE = `[${this.stateName}] INITIALIZE_UPDATE`;
    this.INITIALIZE_UPDATE_SUCCESS = `[${this.stateName}] INITIALIZE_UPDATE_SUCCESS`;
    this.INITIALIZE_UPDATE_FAIL = `[${this.stateName}] INITIALIZE_UPDATE_FAIL`;
    this.DO_CREATE = `[${this.stateName}] DO_CREATE`;
    this.DO_CREATE_SUCCESS = `[${this.stateName}] DO_CREATE_SUCCESS`;
    this.DO_CREATE_FAIL = `[${this.stateName}] DO_CREATE_FAIL`;
    this.DO_UPDATE = `[${this.stateName}] DO_UPDATE`;
    this.DO_UPDATE_SUCCESS = `[${this.stateName}] DO_UPDATE_SUCCESS`;
    this.DO_UPDATE_FAIL = `[${this.stateName}] DO_UPDATE_FAIL`;
    this.DO_REFRESH = `[${this.stateName}] DO_REFRESH `;
  }

  @dispatch() initializeCreate(): Action {
    return {
      type: this.INITIALIZE_CREATE
    };
  }

  @dispatch() initializeUpdate(id: string): ReduxActionModel<string> {
    return {
      type: this.INITIALIZE_UPDATE,
      payload: id
    };
  }

  @dispatch() doRefresh(): ReduxActionModel<string> {
    return {
      type: this.DO_REFRESH
    };
  }

  @dispatch() doCreate(entity: Entity): ReduxActionModel<Entity> {
    return {
      type: this.DO_CREATE,
      payload: entity
    };
  }

  @dispatch() doUpdate(entity: Entity): ReduxActionModel<Entity> {
    return {
      type: this.DO_UPDATE,
      payload: entity
    };
  }
}
