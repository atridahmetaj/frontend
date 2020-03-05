import { dispatch } from "@angular-redux/store";

import { ReduxActionModel } from "../../model/redux-action.model";
import { BaseEntityModel } from "../../../base/model/base-entity.model";
import { BaseFormModel } from "../../../base/model/base-form.model";


export interface IReduxListActions<
  Form extends BaseFormModel,
  Entity extends BaseEntityModel
> {
  stateName: string;
  DO_SEARCH: string;
  DO_SEARCH_SUCCESS: string;
  DO_SEARCH_FAIL: string;
  DO_DELETE: string;
  DO_DELETE_SUCCESS: string;
  DO_DELETE_FAIL: string;

  doSearch: (form?: Form) => ReduxActionModel<Form>;
  doDelete: (entity: Entity) => ReduxActionModel<Entity>;
}

export abstract class ReduxListActions<
  Form extends BaseFormModel,
  Entity extends BaseFormModel
> implements IReduxListActions<Form, Entity> {
  stateName: string;
  DO_SEARCH: string;
  DO_SEARCH_SUCCESS: string;
  DO_SEARCH_FAIL: string;
  DO_CHANGE_STATUS: string;
  DO_CHANGE_STATUS_SUCCESS: string;
  DO_CHANGE_STATUS_FAIL: string;
  DO_DELETE: string;
  DO_DELETE_SUCCESS: string;
  DO_DELETE_FAIL: string;

  protected constructor(stateName: string) {
    this.stateName = stateName;
    this._initializeStateActions();
  }

  private _initializeStateActions(): void {
    this.DO_SEARCH = `[${this.stateName}] DO_SEARCH`;
    this.DO_SEARCH_SUCCESS = `[${this.stateName}] DO_SEARCH_SUCCESS`;
    this.DO_SEARCH_FAIL = `[${this.stateName}] DO_SEARCH_FAIL`;
    this.DO_DELETE = `[${this.stateName}] DO_DELETE`;
    this.DO_DELETE_SUCCESS = `[${this.stateName}] DO_DELETE_SUCCESS`;
    this.DO_DELETE_FAIL = `[${this.stateName}] DO_DELETE_FAIL`;
  }

  @dispatch() doSearch(form?: Form): ReduxActionModel<Form> {
    return {
      type: this.DO_SEARCH,
      payload: form
    };
  }

  @dispatch() doDelete(entity: Entity): ReduxActionModel<Entity> {
    return {
      type: this.DO_DELETE,
      payload: entity
    };
  }
}
