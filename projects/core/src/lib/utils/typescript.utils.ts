export class TypescriptUtils {
    public static newInstanceObjectAssign(...args: any[]): any {
        const parameters = [{}, ...args];

        return Object.assign.apply(this, parameters);
    }
}
