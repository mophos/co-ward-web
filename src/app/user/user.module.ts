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

@NgModule({
  declarations: [InventoryComponent, LayoutComponent, InventoryAddComponent, InventoryEditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HelpModule
  ]
})
export class UserModule { }
