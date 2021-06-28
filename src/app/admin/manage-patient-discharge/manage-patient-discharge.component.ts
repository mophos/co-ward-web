import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteHospitalComponent } from '../../help/autocomplete-hospital/autocomplete-hospital.component';
import { PatientsService } from '../services/patients.service';
import { AlertService } from '../../help/alert.service';
import { IMyOptions } from '@tanjaae/mydatepicker';

@Component({
  selector: 'app-manage-patient-discharge',
  templateUrl: './manage-patient-discharge.component.html',
  styles: []
})
export class ManagePatientDischargeComponent implements OnInit {

  @ViewChild('hospital', { static: true }) hosp: AutocompleteHospitalComponent;
  id: any;
  hospcode: any;
  list: any = [];
  loadings: any = false;
  selected: any = [];
  startDate: any;
  endDate: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  dateDC = null;
  modal = false;

  hour: any;
  minute: any;
  hours: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes: any = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
  constructor(
    private alertService: AlertService,
    private patientsService: PatientsService,
  ) { }

  ngOnInit() {
  }

  async onSelectHosp(e) {
    this.id = e.id;
    this.hospcode = e.hospcode;
    // this.getListPatient();
  }

  async getListPatient() {
    try {
      this.loadings = true;
      const startDate = this.startDate ? this.startDate.date.year + '-' + this.startDate.date.month + '-' + this.startDate.date.day : '';
      const endDate = this.endDate ? this.endDate.date.year + '-' + this.endDate.date.month + '-' + this.endDate.date.day : '';
      const rs: any = await this.patientsService.getPatientDischarge(this.id, startDate, endDate);
      if (rs.ok) {
        this.list = rs.rows;
        console.log(this.list);
        this.loadings = false;
      } else {
        this.alertService.error(rs.error);
        this.loadings = false;
      }
    } catch (error) {
      this.alertService.error(error);
      this.loadings = false;
    }
  }

  openModal() {
    this.modal = true;
  }



  async onClickSave() {

    const confirm = await this.alertService.confirm();
    if (confirm) {
      if (this.dateDC != null) {
        try {
          const dateDC = this.dateDC.date.year + '-' + this.dateDC.date.month + '-' + this.dateDC.date.day + ' ' + this.hour + ':' + this.minute + ':00';
          const rs: any = await this.patientsService.adminSaveDC(this.selected, dateDC);
          if (rs.ok) {
            this.getListPatient();
            this.modal = false;
            this.alertService.success();
          } else {
            console.log(rs.error);
            this.alertService.serverError();
          }
        } catch (error) {
          console.log(error);
          this.alertService.serverError();
        }
      } else {
        this.alertService.error('กรุณาระบุวันที่');
      }
    }
  }


}
