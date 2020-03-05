import { SelectItem } from 'primeng/api';

export class DomainUtils {

    public static getSelectItemArrayFromDomain<Entity>(list: Array<Entity>, labelKey: string = "name", valueKey: string = "id"): Array<SelectItem> {
        const items: Array<SelectItem> = [];

        list.forEach(element => {
            items.push({
                label: element[labelKey],
                value: element[valueKey]
            });
        });

        return items;
    }
}