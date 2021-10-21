import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { HttpServcie } from '../../service/http.service';
import { AppStoreModule } from '../../store';
import { getProject, getTaksInfo } from '../../store/selectors/project.selector';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public detailData: any;

  // 定义subject对象进行节流
  public subject = new Subject<any>();
  public ngUnsubscirbe$ = new Subject<any>();

  constructor(
    private store$: Store<AppStoreModule>,
    private message: NzMessageService,
    private httpServcie: HttpServcie,
  ) { }

  ngOnInit() {
    this.updatePropertyThrottle();
    const appStore$ = this.store$.pipe(select(getProject));  // 从store根模块中获取到playerReducer的流
    appStore$.pipe(
      select(getTaksInfo),
      debounceTime(300),  // 300毫秒类多次点击不发送请求，超过300毫秒没点击后调用最后一次请求
    ).subscribe(res => this._storeUp(res));
  }

  private _storeUp(res: any) {
    // console.log(res,'res')
    this.detailData = res;
  }


  // 属性值改变后，调用属性修改API
  changePropertyValue(event?, property?, id?) {
    let param = {}
    param['value'] = event;
    param['id'] = id;
    param['key'] = property.key;
    this.subject.next(param);
  }

  // API节流方法
  updatePropertyThrottle() {
    this.subject.pipe(
      debounceTime(300),
		  takeUntil(this.ngUnsubscirbe$)
    ).subscribe(data => {
      // console.log(data,'data');
      if(data) {
        this.updateProperty(data);
      }
    })
  }

  // 修改属性方法
  updateProperty(data) {
    this.httpServcie.updateProperty(data).subscribe(
      data => {
        if(data['success']) {
          this.message.create('success', '修改成功');
        }
      }
    )
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
    this.ngUnsubscirbe$.next();
    this.ngUnsubscirbe$.complete();
  }

}
