import { HelpModule } from 'src/app/help/help.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { CheckBedsComponent } from './check-beds/check-beds.component';

@NgModule({
  declarations: [LayoutComponent, CheckBedsComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HelpModule
  ]
})
export class ManagerModule { }
