import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { HttpServcie } from '../../service/http.service';
import { PARENT, ParentComponent } from '../parent';

@Component({
  selector: 'app-my-select',
  templateUrl: './my-select.component.html',
  styleUrls: ['./my-select.component.css']
})
export class MySelectComponent implements OnInit {

  public _value: any;
  public _property: any;
  // @ViewChild(MiddleComponent, {static: false}) private middle: MiddleComponent;

  public isShowBorder: boolean = true;

  public datas: Array<any> = [];

  @Input()
  set property(value: any) {
    this._property = value;
    this.getPropertits(value.key);
  }

  @Input()
  set value(value: any) {
    this._value = value;
  }

  /**
   * Optional装饰器 表示可有可无, 如果没有使用 Optional, 在没有provider 而尝试注入 组件 的情况下, angular 是会报错的
   * @Inject是构造函数参数的注入器。@Inject(token) private ualue:ValueType，它告诉Angular框架需要从注入器中获取token
   * 对应的一个实例进行注入。所以如果我们在一个服务中的构造函数中依赖注入参数，也可以不使用@Injectable装饰器，可以直接在参数中
   * 使用@Inject(Aservice) private aService: Aservice进行注入。
   */
  constructor(
    @Optional() @Inject(PARENT) private parent: ParentComponent,
    private httpServcie: HttpServcie
  ) { }

  ngOnInit() {
  }

  change(event) {
    this.parent.changePropertyValue(event);
  }

  // 获取数据源
  getPropertits(type: string) {
    this.httpServcie.getPropertits(type).subscribe(
      res => {
        this.datas = res['data'];
      }
    )
  }

}
