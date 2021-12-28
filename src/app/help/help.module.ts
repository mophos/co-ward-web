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
import { AutocompleteCountriesComponent } from './autocomplete-countries/autocomplete-countries.component';
import { EnNoSpaceDirective } from './en-no-space.directive';
import { SelectedHospitalChildNodeComponent } from './selected-hospital-child-node/selected-hospital-child-node.component';
import { HelpService } from './help.service';
import { CheckCutTimePipe } from './check-cut-time.pipe';
import { FulfillDrugDetailsComponent } from './fulfill-drug-details/fulfill-drug-details.component';
import { FulfillSuppliesDetailsComponent } from './fulfill-supplies-details/fulfill-supplies-details.component';
import { FulfillSurgicalMaskDetailsComponent } from './fulfill-surgical-mask-details/fulfill-surgical-mask-details.component';
import { HpvcComponent } from './hpvc/hpvc.component';
import { AutocompleteIcd10Component } from './autocomplete-icd10/autocomplete-icd10.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectProvincesComponent } from './select-provinces/select-provinces.component';
import { SelectZonesComponent } from './select-zones/select-zones.component';

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
    SafePipe,
    AutocompleteCountriesComponent,
    EnNoSpaceDirective,
    SelectedHospitalChildNodeComponent,
    CheckCutTimePipe,
    FulfillDrugDetailsComponent,
    FulfillSuppliesDetailsComponent,
    FulfillSurgicalMaskDetailsComponent,
    HpvcComponent,
    AutocompleteIcd10Component,
    SelectProvincesComponent,
    SelectZonesComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    AgxTypeaheadModule,
    NgSelectModule
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
    AutocompleteHospitalRequisitionComponent,
    AutocompleteCountriesComponent,
    EnNoSpaceDirective,
    SelectedHospitalChildNodeComponent,
    CheckCutTimePipe,
    SafePipe,
    FulfillDrugDetailsComponent,
    FulfillSuppliesDetailsComponent,
    FulfillSurgicalMaskDetailsComponent,
    HpvcComponent,
    AutocompleteIcd10Component,
    SelectProvincesComponent,
    SelectZonesComponent
  ],
  providers: [
    HelpService
  ]
})
export class HelpModule { }
