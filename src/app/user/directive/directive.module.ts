import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteAddressComponent } from './autocomplete-address/autocomplete-address.component';
import { AutocompleteProvinceComponent } from './autocomplete-address/autocomplete-province/autocomplete-province.component';
import { AutocompleteDistrictComponent } from './autocomplete-address/autocomplete-district/autocomplete-district.component';
import { AutocompleteSubdistrictComponent } from './autocomplete-address/autocomplete-subdistrict/autocomplete-subdistrict.component';
import { AutocompleteZipcodeComponent } from './autocomplete-address/autocomplete-zipcode/autocomplete-zipcode.component';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HelpModule } from 'src/app/help/help.module';
import { AgxTypeaheadModule } from '@tanjaae/agx-typeahead';

@NgModule({
  declarations: [
    AutocompleteProvinceComponent,
    AutocompleteDistrictComponent,
    AutocompleteSubdistrictComponent,
    AutocompleteZipcodeComponent,
    AutocompleteAddressComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HelpModule,
    AgxTypeaheadModule
  ],
  exports: [
    AutocompleteSubdistrictComponent,
    AutocompleteDistrictComponent,
    AutocompleteProvinceComponent,
    AutocompleteZipcodeComponent,
    AutocompleteAddressComponent
  ]
})
export class DirectiveModule { }
