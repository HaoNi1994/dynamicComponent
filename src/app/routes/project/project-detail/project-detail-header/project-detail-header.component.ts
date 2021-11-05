import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AppStoreModule } from 'src/app/common/shared/store';
import { SetTabInfo, SetTaskData } from 'src/app/common/shared/store/actions/project.action';
import { getProject, getProjectInfo, getTabInfo } from 'src/app/common/shared/store/selectors/project.selector';
import { ProjectInfo, TabInfo } from 'src/app/common/shared/type/store.type';

import * as _ from 'lodash';
import { getLocalStorage, setLocalStorage } from 'src/app/common/shared/utils/localstorage';
import { Subject } from 'rxjs';
import { destroyThrottle, throttle } from 'src/app/common/shared/utils/throttle';
import { HttpServcie } from 'src/app/common/shared/service/http.service';
import { ProjectData } from 'src/app/common/shared/type/data.type';

@Component({
  selector: 'app-project-detail-header',
  templateUrl: './project-detail-header.component.html',
  styleUrls: ['./project-detail-header.component.css']
})
export class ProjectDetailHeaderComponent implements OnInit {

  public projectInfo: ProjectInfo;

  public tabList: Array<any>;

  public moreTitle: string;

  public tabInfo: any;

  // 定义subject对象进行节流
  private subject = new Subject<any>();
  private ngUnsubscirbe$ = new Subject<any>();

  constructor(
    private store$: Store<AppStoreModule>,
    private httpServcie: HttpServcie
  ) { }

  ngOnInit() {
    // 节流函数
    throttle(this.subject, this.ngUnsubscirbe$).subscribe(
      data => {
        this._changeTab(data);
      }
    );
    const appStore$ = this.store$.pipe(select(getProject));  // 从store根模块中获取到playerReducer的流
    appStore$.pipe(
      select(getProjectInfo),
      debounceTime(300),  // 300毫秒类多次点击不发送请求，超过300毫秒没点击后调用最后一次请求
      ).subscribe(res => this.getInfo(res));
    appStore$.pipe(
      select(getTabInfo),
      debounceTime(300),  // 300毫秒类多次点击不发送请求，超过300毫秒没点击后调用最后一次请求
      ).subscribe(res => this.getTabInfo(res));
  }

  // 获取项目的监听结果
  async getInfo(res: ProjectInfo) {
    this.projectInfo = res;
    this.tabList = res.tab;
    const tabLists: Array<any> = getLocalStorage('tabList') || [];
    const tab = _.find(tabLists, {projectId: this.projectInfo.id});
    if(tab) {
      this.tabInfo = tab.tab;
      if(this.tabInfo.key === 'more') {
        this.moreTitle = this.tabInfo.value;
      }
      this.store$.dispatch(SetTabInfo({tabInfo: this.tabInfo}));
    } else {
      this.tabInfo = this.tabList[0];
      tabLists.push({'projectId': this.projectInfo.id, 'tab': this.tabInfo});
      setLocalStorage('tabList', tabLists);
      this.store$.dispatch(SetTabInfo({tabInfo: this.tabInfo}));
    }
    let item = await this.httpServcie.getProjectData(this.projectInfo.id, this.tabInfo.key).toPromise();
    let datas: ProjectData = item['data'] || [];
    this.store$.dispatch(SetTaskData({taskData: datas}));
  }

  // 获取tab的监听结果
  getTabInfo(res: TabInfo) {
    this.tabInfo = res;
  }

  // 切换tab
  select(item: any, type?: string) {
    let param = {};
    param['item'] = item;
    if(type) {
      param['type'] = type;
    }
    this.subject.next(param);
  }

  // 处理tab切换的逻辑函数
  public async _changeTab(data) {
    if(data.type && data.type === 'more') {
        this.moreTitle = data.item.value;
    } else {
      this.moreTitle = null;
    }
    this.store$.dispatch(SetTabInfo({tabInfo: data.item}));
    const tabLists: Array<any> = getLocalStorage('tabList');
    const tabIndex = _.findIndex(tabLists, {projectId: this.projectInfo.id});
    tabLists.splice(tabIndex, 1, {'projectId': this.projectInfo.id, 'tab': data.item})
    setLocalStorage('tabList', tabLists);
    let item = await this.httpServcie.getProjectData(this.projectInfo.id, data.item.key).toPromise();
    let datas: ProjectData = item['data'] || [];
    this.store$.dispatch(SetTaskData({taskData: null}));  // 如果数据是一样的，则会一直加载
    this.store$.dispatch(SetTaskData({taskData: datas}));
  }

  ngOnDestroy() {
    destroyThrottle(this.subject, this.ngUnsubscirbe$);
  }

}
