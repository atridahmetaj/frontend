import { BaseEntityModel } from "../../../base/model/base-entity.model";
import { ReduxModelState } from '../../model/redux-model-state.enum';

export interface ReduxCrudStore<
  Entity extends BaseEntityModel
> { 
  entity?: Entity;
  lastOperator?: string;
  modelState?: ReduxModelState;
}
