import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../common/shared/shared.module';
import { AppStoreModule } from '../common/shared/store';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    SharedModule,
    AppStoreModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
  ]
})
export class CoreModule { }
