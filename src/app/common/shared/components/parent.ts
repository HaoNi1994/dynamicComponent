import { EventEmitter, InjectionToken } from "@angular/core";

export interface ParentComponent {
    changeSubmit: EventEmitter<any>;
    changePropertyValue: Function
}
/**
 * InjectionToken 用于创建可在 Provider 中使用的 Token
 * OpaqueToken 与 InjectionToken的区别:
 * OpaqueToken 是 Angular 2.x 版本中引入的类
 * InjectionToken 是在 Angular 4.x 版本中引入的类，该类继承于 OpaqueToken，且引入了泛型用于定义所关联的依赖对象的类型
 */
export const PARENT = new InjectionToken<ParentComponent>('PARENT_COMPONENT');