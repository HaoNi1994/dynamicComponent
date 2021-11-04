import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HttpServcie } from 'src/app/common/shared/service/http.service';
import { AppStoreModule } from 'src/app/common/shared/store';
import { getProject, getProjectInfo, getTabInfo, getTaksData } from 'src/app/common/shared/store/selectors/project.selector';
import { ProjectInfo, TabInfo } from 'src/app/common/shared/type/store.type';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ProjectData } from 'src/app/common/shared/type/data.type';
import { Subject } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { DetailComponent } from 'src/app/common/shared/components/detail/detail.component';
import { KeyComponentRelationship, KeyValueRelationship } from 'src/app/common/shared/utils/key-value';
import { SetTaskData, SetTaskInfo } from 'src/app/common/shared/store/actions/project.action';

import * as _ from 'lodash';
import { getLocalStorage } from 'src/app/common/shared/utils/localstorage';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  public projectInfo: ProjectInfo;
  public data: ProjectData;
  public loading: boolean = false;

  // 定义subject对象进行节流
  public subject = new Subject<any>();
  public ngUnsubscirbe$ = new Subject<any>();

  constructor(
    private store$: Store<AppStoreModule>,
    private httpServcie: HttpServcie,
    private modalService: NzModalService,
  ) {
    
  }

  ngOnInit() {
    this.loading = true;
    this._getDetail();
    const appStore$ = this.store$.pipe(select(getProject));  // 从store根模块中获取到playerReducer的流
    appStore$.pipe(
      select(getTaksData),
      debounceTime(300),  // 300毫秒类多次点击不发送请求，超过300毫秒没点击后调用最后一次请求
      ).subscribe(res => this._getTaskData(res));
    appStore$.pipe(
      select(getTabInfo),
      debounceTime(300),  // 300毫秒类多次点击不发送请求，超过300毫秒没点击后调用最后一次请求
      ).subscribe(res => this.getTabInfo(res));
  }


  private _getTaskData(data: ProjectData) {
    console.log(data,'dddd')
    if(data !== null) {
      this.data = data;
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  // 获取tab的监听结果
  getTabInfo(res: TabInfo) {
    console.log(7777)
    this.loading = true;
  }

  // 获取详情
  detail(data: ProjectData) {
    this.subject.next(data);
  }

  // 获取详情-节流函数
  private _getDetail() {
    this.subject.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscirbe$)
    ).subscribe(data => {
      // console.log(data,'data');
      this.showDetail(data);
    })
  }

  // 打开详情页面，展示详情
  async showDetail(data: ProjectData) {
    let returnData: any = await this.httpServcie.getDetail(data.id).toPromise();
    let handleData = returnData.data || {};
    let detailData: any;
    if(handleData) {
      this.handleData(handleData);
    } else {
      detailData = handleData;
    }
    const modal = this.modalService.create({
      nzTitle: `${data.number}${data.title}`,
      nzContent: DetailComponent,
      nzComponentParams: {
      },
      nzWidth: 1100,
      nzClosable: true,
      nzFooter: null
    });
  }

  handleData(handleData: any) {
    let param = {};
    let content = [];
    let porperties = {};
    let id = handleData.id || '';
    Object.keys(handleData).forEach(key => {
      if(key !== 'id') {
        let contentObj = {
          type: KeyComponentRelationship[key],
          key: key,
          name: KeyValueRelationship[key]
        }
        content.push(contentObj);
        porperties[key] = {value: handleData[key]};
      }
    })
    param['id'] = id;
    param['content'] = content;
    param['porperties'] = porperties;
    this.store$.dispatch(SetTaskInfo({taskInfo: param}));
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
    this.ngUnsubscirbe$.next();
    this.ngUnsubscirbe$.complete();
  }

}
