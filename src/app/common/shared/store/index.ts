import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { projectReducer } from './reducers/project.reducer';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ project: projectReducer}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 20, // 最多记录20条
      logOnly: environment.production   // environment.production为ture时，是生产环境
    })
  ]
})
export class AppStoreModule { }