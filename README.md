# DynamicComponent

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.29.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



### 模块

```
*两个页面
1.项目查询页面
2.任务查询页面
*六个功能
1.增加项目
2.编辑项目
3.项目详情
4.增加任务
5.编辑任务
6.任务详情
```



### 技术栈

```
angular8,ngzorroUI框架,mock,TypeScript
```



### 记录

```
*2021-10-12************************************************************************
创建angular8项目
引入ngzorro和mock框架
引入ngzorro样式
创建common公共模块和component组件模块
右边导航栏滑动条样式修改

*2021-10-13***********************************************************************
完善左边导航栏和右边列表展示
ngzorro图标的显示问题-----------------
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd/icon';
import { BookOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [ BookOutline ];
imports: [NzIconModule]
providers: [
    // { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons }
  ],

使用flex布局，使空值页面居中---------
 display: flex;
 align-items: center;
 justify-content: center;
 
 *2021-10-14***********************************************************************
 使用ngstore完成数据管理
 
 *2021-10-21***********************************************************************
 写表格，在shared里面创建一个css文件夹，新建一个common.css公共样式，并在style.css中引入
 写任务详情的组件detail
 写动态组件中间件middle.component.ts,在中间件中注入一个parent组件
 写input框公共组件
 在这里可以不需要哦parent这个组件，直接引入MiddleComponent,调用changePropertyValue方法
 *在middle.component.ts中
 	// 拿到一个组件
      const component = _.find(COMMON_COMPONENT, { type: this._property.type 			      }).component;
     调用这个方法，会导致又跳回到index.ts;导致 Circular dependency detected；把COMMON_COMPONENT换个地方，放在在util中定义的一个配置就可以了
     
*2021-10-26**************************************************************************
增加下拉框公共组件

*2021-10-28***************************************************************************
写项目详情头部的导航栏，使用的是ngzorro里面的导航栏组件

*2021-10-29**************************************************************************
优化代码
将节流函数抽离出来作为公共函数，将localstorage抽离出来作为公共函数
```

