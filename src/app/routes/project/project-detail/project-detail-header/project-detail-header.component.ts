import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { debounceTime } from 'rxjs/operators';
import { AppStoreModule } from 'src/app/common/shared/store';
import { SetTablInfo } from 'src/app/common/shared/store/actions/project.action';
import { getProject, getProjectInfo, getTabInfo } from 'src/app/common/shared/store/selectors/project.selector';
import { ProjectInfo, TabInfo } from 'src/app/common/shared/type/store.type';

import * as _ from 'lodash';

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

  interface

  constructor(
    private store$: Store<AppStoreModule>,
  ) { }

  ngOnInit() {
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

  getInfo(res: ProjectInfo) {
    this.projectInfo = res;
    this.tabList = res.tab;
    const tabLists: Array<any> = JSON.parse(localStorage.getItem('tabList')) || [];
    const tab = _.find(tabLists, {projectId: this.projectInfo.id});
    if(tab) {
      this.tabInfo = tab.tab;
      if(this.tabInfo.key === 'more') {
        this.moreTitle = this.tabInfo.value;
      }
      this.store$.dispatch(SetTablInfo({tabInfo: this.tabInfo}));
    } else {
      this.tabInfo = this.tabList[0];
      tabLists.push({'projectId': this.projectInfo.id, 'tab': this.tabInfo});
      localStorage.setItem('tabList', JSON.stringify(tabLists));
      this.store$.dispatch(SetTablInfo({tabInfo: this.tabInfo}));
    }
  }

  getTabInfo(res: TabInfo) {
    this.tabInfo = res;
  }

  select(item: any, type?: string) {
    if(type && type === 'more') {
        this.moreTitle = item.value;
    }
    this.store$.dispatch(SetTablInfo({tabInfo: item}));
    const tabLists: Array<any> = JSON.parse(localStorage.getItem('tabList'));
    const tabIndex = _.findIndex(tabLists, {projectId: this.projectInfo.id});
    tabLists.splice(tabIndex, 1, {'projectId': this.projectInfo.id, 'tab': item})
    localStorage.setItem('tabList', JSON.stringify(tabLists));
  }

}
