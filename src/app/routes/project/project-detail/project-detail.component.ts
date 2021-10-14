import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStoreModule } from 'src/app/common/shared/store';
import { getProject, getProjectInfo } from 'src/app/common/shared/store/selectors/project.selector';
import { ProjectInfo } from 'src/app/common/shared/type/store.type';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  public projectInfo: ProjectInfo;

  constructor(
    private routerinfo: ActivatedRoute,
    private store$: Store<AppStoreModule>,
  ) {
    
  }

  ngOnInit() {
    const appStore$ = this.store$.pipe(select(getProject));  // 从store根模块中获取到playerReducer的流
    appStore$.pipe(select(getProjectInfo)).subscribe(res => this._storeUp(res));
  }

  private _storeUp(res: ProjectInfo) {
    this.projectInfo = res;
  }

}
