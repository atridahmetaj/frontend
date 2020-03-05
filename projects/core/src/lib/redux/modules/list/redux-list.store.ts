
import { BaseEntityModel } from '../../../base/model/base-entity.model';
import { ColumnmModel } from '../../../base/model/column.model';


export interface ReduxListStore<Entity extends BaseEntityModel> {
    list?: Array<Entity>;
    columns?: Array<ColumnmModel>;
    lastOperation?: string;
    isLoading?: boolean;
}   