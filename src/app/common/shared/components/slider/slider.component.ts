import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServcie } from '../../service/http.service';
import { MeauList } from '../../type/meau.type';

import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { AppStoreModule } from '../../store';
import { SetProjectInfo, SetTablInfo } from '../../store/actions/project.action';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public meau: MeauList;
  public routeUlr = "project/";

  constructor(
    private httpServcie: HttpServcie,
    private router: Router,
    private location: PlatformLocation,
    private store$: Store<AppStoreModule>,
    ) { }

  ngOnInit() {
    this._getMeun();
  }

  private _getMeun() {
    this.httpServcie.getMeun().subscribe(
      res => {
        if(res['data'].length > 0) {
          // 判断当前那个文件夹打开
          let currentId: string;
          for (const i in this.location) {
            if (i === 'location') {
              let pathname = this.location[i].pathname;
              let urlArr = pathname.split('/');
              if(urlArr.indexOf('project') !== -1) {
                let index = urlArr.indexOf('project');
                currentId = urlArr[index + 1];
              }
              break;
            }
          }
          let resData = res['data'];
          let obj = _.find(resData, {id: currentId});
          if(obj) {
            obj['status'] = true;
            this.store$.dispatch(SetProjectInfo({projectInfo: obj}));
          }
          this.meau = resData;
        }
      }
    )
  }

  go(id: string, item) {
    this.router.navigateByUrl(this.routeUlr + id);
    this.store$.dispatch(SetProjectInfo({projectInfo: item}));
  }

}
