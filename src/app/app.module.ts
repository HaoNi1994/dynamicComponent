import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// 引入mock
import * as MOCKDATA from '../../_mock';
import { environment } from 'src/environments/environment';
import { DelonMockModule } from '@delon/mock/src/mock.module';
const MOCKMODULE = !environment.production ? [ DelonMockModule.forRoot({ data: MOCKDATA }) ] : [];

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    ...MOCKMODULE    // 使用mock
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
