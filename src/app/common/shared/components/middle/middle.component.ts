import { Component, ComponentFactoryResolver, EventEmitter, forwardRef, Injector, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { COMMON_COMPONENT } from '../../utils/common-config';
import { PARENT } from '../parent';
import * as _ from 'lodash';

@Component({
  selector: 'app-middle',
  template: ``,
  /**
   * providers依赖注入
   * 在这里注入PARENT这个组件
   * useExisting表示这里允许引用一个尚未定义的类
   */
  providers: [
    { provide: PARENT, useExisting: forwardRef(() => MiddleComponent) }
    // {provide: PARENT, useExisting: MiddleComponent}
  ]
})
export class MiddleComponent implements OnInit {
  private _componentInstance: any;
  private _propertyValue: any;
  private _property: any;


  @Input()
  set property(value: any) {
    // console.log(value, 'property');
    this._property = value;
  }

  @Input()
  set propertyValue(value: any) {
    // console.log(value, 'propertyValue');
    this._propertyValue = value;
  }

  // 修改事件
  @Output() changeSubmit = new EventEmitter<any>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  ngOnInit() {
    this._createComponent();
  }

  // 动态创建一个组件
  private _createComponent() {
    if (this._property) {
      // viewContainerRef视图容器，这里是先清空视图
      this.viewContainerRef.clear();
      // 拿到一个组件
      const component = _.find(COMMON_COMPONENT, { type: this._property.type }).component;
      // 首先为component解析出一个componentFactory，然后componentFactory会为component创建一个实例
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component as any);
      // 将viewContainerRef指向创建的实例，通过调用createComponent()将这个组件添加到模板中
      const _componentRef = this.viewContainerRef.createComponent(componentFactory, null, this.injector);
      this._componentInstance = _componentRef.instance as any;
      // 这里通过instance可以直接访问创建组件中的public属性，也可以使用subscribe来订阅组件中的事件
      // this._componentInstance.add.subscribe((data) => {
      //     console.log(data);
      //   });
      this._componentInstance.property = this._property;
      this._componentInstance.value = this._propertyValue;
    }
  }

  // 接收回调并广播出去
  changePropertyValue(event) {
    this.changeSubmit.emit(event);
  }

}
