import { Subscription } from 'rxjs';

export class TypescriptUtils {
    public static newInstanceObjectAssign(...args: any[]): any {
        const parameters = [{}, ...args];

        return Object.assign.apply(this, parameters);
    }


    public static unsubscribe(subscription: Subscription) {
        // tslint:disable-next-line: no-unused-expression
        subscription &&
            TypescriptUtils.isFunction(subscription.unsubscribe) &&
            subscription.unsubscribe();
    }

    public static isFunction(fn: any) {
        return (typeof fn === 'function');
    }

    /**
     * @param object object to access the value from
     * @param property property name, supports nested properties, separated with a `.` (period)
     * @returns value of the object's property
     * @example
     * Utils.getPropertyValue(this.department, 'department.head.name');
     */
    // tslint:disable-next-line: max-line-length
    public static getPropertyValue = (object: any, property: string): any => object && property && (property.includes('.') ? property.split('.').reduce((acc, cur) => acc && acc[cur], object) : object[property]);
}

