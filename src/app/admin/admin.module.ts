import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpModule } from './../help/help.module';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { ManageSuppliesComponent } from './manage-supplies/manage-supplies.component';
import { ManageMinMaxComponent } from './manage-min-max/manage-min-max.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageRequestComponent } from './manage-request/manage-request.component';
import { ManageMinMaxSubComponent } from './manage-min-max-sub/manage-min-max-sub.component';
import { ManageRequestSubComponent } from './manage-request-sub/manage-request-sub.component';
import { ManageRestockComponent } from './manage-restock/manage-restock.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ManageSuppliesComponent,
    ManageMinMaxComponent,
    ManageUserComponent,
    ManageRequestComponent,
    ManageMinMaxSubComponent,
    ManageRequestSubComponent,
    ManageRestockComponent
  ],
  imports: [
    HelpModule,
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ]
})
export class AdminModule { }
