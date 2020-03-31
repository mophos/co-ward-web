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

@NgModule({
  declarations: [
    InventoryComponent, 
    LayoutComponent, 
    InventoryAddComponent, 
    InventoryEditComponent, 
    TrackingComponent, 
    TrackingDetailComponent, 
    BedComponent, 
    SettingComponent, CheckBedComponent, CheckSuppliesComponent
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
  exports:[
    InventoryAddComponent,
    InventoryEditComponent,
    TrackingDetailComponent
  ]
})
export class UserModule { }
