import { HelpModule } from './../help/help.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InventoryComponent } from './inventory/inventory.component';
import { LayoutComponent } from './layout/layout.component';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { BedComponent } from './bed/bed.component';
import { SettingComponent } from './setting/setting.component';
import { CheckBedComponent } from './check-bed/check-bed.component';
import { CheckSuppliesComponent } from './check-supplies/check-supplies.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { RequisitionNewComponent } from './requisition-new/requisition-new.component';
import { RequisitionEditComponent } from './requisition-edit/requisition-edit.component';
import { ReceiveDrugComponent } from './receive-drug/receive-drug.component';

import { AuthBalancesuppile } from '../auth-balancesuppile.service';
import { AuthStatustracking } from '../auth-statustracking.service';
import { AuthCheckbed } from '../auth-checkbed.service';
import { AuthChecksupplie } from '../auth-checksupplie.service';
import { AuthSetting } from '../auth-setting.service';
import { AuthRequisition } from '../auth-requisition.service';

@NgModule({
  declarations: [
    InventoryComponent,
    LayoutComponent,
    InventoryAddComponent,
    InventoryEditComponent,
    TrackingComponent,
    TrackingDetailComponent,
    BedComponent,
    SettingComponent, 
    CheckBedComponent, 
    CheckSuppliesComponent,
    RequisitionComponent,
    RequisitionNewComponent, 
    RequisitionEditComponent,
    ReceiveDrugComponent
  ],
  imports: [
    HelpModule,
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [
    InventoryAddComponent,
    InventoryEditComponent,
    TrackingDetailComponent
  ],
  providers: [
    AuthBalancesuppile,
    AuthStatustracking,
    AuthCheckbed,
    AuthChecksupplie,
    AuthSetting,
    AuthRequisition,
  ]
})
export class UserModule { }
