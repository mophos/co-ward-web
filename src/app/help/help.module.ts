import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { DateThPipe } from './dateTh.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaddingComponent } from './loadding/loadding.component';
import { AgxTypeaheadModule } from '@tanjaae/agx-typeahead';
import { AutocompleteAddressComponent } from './autocomplete-address/autocomplete-address.component';
import { AutocompleteSubdistrictComponent } from './autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteDistrictComponent } from './autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteZipcodeComponent } from './autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';
import { AutocompleteProvinceComponent } from './autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteHospitalComponent } from './autocomplete-hospital/autocomplete-hospital.component';
import { NumberOnlyDirective } from './number-only.directive';
import { AutocompleteHospitalRequisitionComponent } from './autocomplete-hospital-requisition/autocomplete-hospital-requisition.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    DateThPipe,
    LoaddingComponent,
    AutocompleteAddressComponent,
    AutocompleteSubdistrictComponent,
    AutocompleteDistrictComponent,
    AutocompleteAddressComponent,
    AutocompleteZipcodeComponent,
    AutocompleteProvinceComponent,
    AutocompleteHospitalComponent,
    NumberOnlyDirective,
    AutocompleteHospitalRequisitionComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    AgxTypeaheadModule
  ],
  exports: [
    DateThPipe,
    LoaddingComponent,
    AutocompleteAddressComponent,
    AutocompleteSubdistrictComponent,
    AutocompleteDistrictComponent,
    AutocompleteAddressComponent,
    AutocompleteZipcodeComponent,
    AutocompleteProvinceComponent,
    AutocompleteHospitalComponent,
    NumberOnlyDirective,
    AutocompleteHospitalRequisitionComponent
  ]
})
export class HelpModule { }
