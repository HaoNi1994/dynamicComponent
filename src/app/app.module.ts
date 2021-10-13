import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// 引入mock
import * as MOCKDATA from '../../_mock';
import { environment } from 'src/environments/environment';
import { DelonMockModule } from '@delon/mock/src/mock.module';
const MOCKMODULE = !environment.production ? [ DelonMockModule.forRoot({ data: MOCKDATA }) ] : [];

import { AppRoutingModule } from './app-routing.module';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd/icon';
import { BookOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [ BookOutline ];

import { SliderComponent } from './common/shared/components/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    NzIconModule,
    ...MOCKMODULE    // 使用mock
  ],
  providers: [
    // { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
