import { TypescriptUtils } from './typescript.utils';


export function AutoUnsubscription({
  method = "ngOnDestroy"
} = {}) {
  return function (constructor: Function) {
    const original = constructor.prototype[method];
    if (!TypescriptUtils.isFunction(original)) {
      throw new Error(
        `${
        constructor.name
        } is using AutoUnsubscription but does not implement ${method}`
      );
    }
    constructor.prototype[method] = function () {
      TypescriptUtils.isFunction(original) && original.apply(this, arguments);
      for (let propName in this) {
        const property = this[propName];
        TypescriptUtils.unsubscribe(property);
      }
    };
  };
}