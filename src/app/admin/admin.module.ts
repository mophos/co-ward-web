import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { LayoutComponent } from './layout/layout.component';
import { ManageSuppilesComponent } from './manage-suppiles/manage-suppiles.component';
import { ManageMinMaxComponent } from './manage-min-max/manage-min-max.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageRequestComponent } from './manage-request/manage-request.component';

@NgModule({
  declarations: [LayoutComponentComponent, LayoutComponent, ManageSuppilesComponent, ManageMinMaxComponent, ManageUserComponent, ManageRequestComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ]
})
export class AdminModule { }
