import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteHospitalComponent } from '../../help/autocomplete-hospital/autocomplete-hospital.component';
import { PatientsService } from '../services/patients.service';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-manage-patient-discharge',
  templateUrl: './manage-patient-discharge.component.html',
  styles: []
})
export class ManagePatientDischargeComponent implements OnInit {

  @ViewChild('hospital', { static: true }) hosp: AutocompleteHospitalComponent;
  id: any;
  hospcode: any;
  list: any;
  loading: any = false;

  constructor(
    private alertService: AlertService,
    private patientsService: PatientsService,
  ) { }

  ngOnInit() {
  }

  async onSelectHosp(e) {
    this.id = e.id;
    this.hospcode = e.hospcode;
    this.getListPatient();
  }

  async getListPatient() {
    try {
      this.loading = true;
      const rs: any = await this.patientsService.getPatientDischarge(this.id);
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
        this.loading = false;
      } else {
        this.alertService.error(rs.error);
        this.loading = false;
      }
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
  }

}
