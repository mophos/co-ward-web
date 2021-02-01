import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteHospitalComponent } from '../../help/autocomplete-hospital/autocomplete-hospital.component';

@Component({
  selector: 'app-manage-patient-discharge',
  templateUrl: './manage-patient-discharge.component.html',
  styles: []
})
export class ManagePatientDischargeComponent implements OnInit {

  @ViewChild('hospital') hosp: AutocompleteHospitalComponent;
  id: any;
  hospcode: any;
  constructor() { }

  ngOnInit() {
  }

  async onSelectHosp(e) {
    this.id = e.id;
    this.hospcode = e.hospcode;
    console.log(this.id, this.hospcode);
  }

}
