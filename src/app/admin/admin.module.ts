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
import { ManageRestockEditComponent } from './manage-restock-edit/manage-restock-edit.component';
import { PayNowComponent } from './pay-now/pay-now.component';
import { AuthRestock } from '../auth-restock.service';
import { AuthUsermanage } from '../auth-usermanage.service';
import { AuthSuppliemanage } from '../auth-suppliemanage.service';
import { AuthMinmax } from '../auth-minmax.service';
import { ManageHospitalComponent } from './manage-hospital/manage-hospital.component';
import { AuthHospitalmanage } from '../auth-hospitalmanage.service';
import { ManageDrugComponent } from './manage-drug/manage-drug.component';
import { RequisitionMinMaxComponent } from './requisition-min-max/requisition-min-max.component';
import { ManageRestockCollectionComponent } from './manage-restock-collection/manage-restock-collection.component';
import { AuthRestockCollection } from '../auth-restock-collection.service';
import { HomeComponent } from './home/home.component';
import { FulfillDrugsComponent } from './fulfill-drugs/fulfill-drugs.component';
import { ManageMinMaxDrugsComponent } from './manage-min-max-drugs/manage-min-max-drugs.component';
import { ManageSystemsComponent } from './manage-systems/manage-systems.component';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { FulfillSurgicalMaskComponent } from './fulfill-surgical-mask/fulfill-surgical-mask.component';
import { FulfillSurgicalMaskListComponent } from './fulfill-surgical-mask-list/fulfill-surgical-mask-list.component';
import { FulfillSuppliesComponent } from './fulfill-supplies/fulfill-supplies.component';
import { ManageMinMaxSuppliesComponent } from './manage-min-max-supplies/manage-min-max-supplies.component';
import { ManageNodeSurgicalComponent } from './manage-node-surgical/manage-node-surgical.component';
import { FulfillSuppliesNewComponent } from './fulfill-supplies/fulfill-supplies-new/fulfill-supplies-new.component';
import { ExportComponent } from './export/export.component';
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ManageSuppliesComponent,
    ManageMinMaxComponent,
    ManageUserComponent,
    ManageRequestComponent,
    ManageMinMaxSubComponent,
    ManageRequestSubComponent,
    ManageRestockComponent,
    ManageRestockEditComponent,
    PayNowComponent,
    ManageHospitalComponent,
    ManageDrugComponent,
    RequisitionMinMaxComponent,
    ManageRestockCollectionComponent,
    HomeComponent,
    FulfillDrugsComponent,
    ManageMinMaxDrugsComponent,
    ManageSystemsComponent,
    FulfillSurgicalMaskComponent,
    FulfillSurgicalMaskListComponent,
    FulfillSuppliesComponent,
    ManageMinMaxSuppliesComponent,
    ManageNodeSurgicalComponent,
    FulfillSuppliesNewComponent,
    ExportComponent,
    ManagePatientsComponent
  ],
  imports: [
    HelpModule,
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    MyDatePickerTHModule
  ],
  providers: [
    AuthRestock,
    AuthUsermanage,
    AuthSuppliemanage,
    AuthMinmax,
    AuthHospitalmanage,
    AuthRestockCollection
  ]
})
export class AdminModule { }
