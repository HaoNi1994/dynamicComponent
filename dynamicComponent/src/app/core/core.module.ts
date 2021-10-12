import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../common/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    SharedModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ]
})
export class CoreModule { }
