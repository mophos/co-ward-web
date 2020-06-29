import { HpvcComponent } from './../../help/hpvc/hpvc.component';
import { Router } from '@angular/router';
import { AlertService } from './../../help/alert.service';
import { CovidCaseService } from './../services/covid-case.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import thaiIdCard from 'thai-id-card';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
@Component({
  selector: 'app-covid-case',
  templateUrl: './covid-case.component.html',
  styles: []
})
export class CovidCaseComponent implements OnInit {

  // modalCID = false;
  // modalCIDType = 'CID';
  // modalCidLoading = false;
  // isModelSearch = false;

  // modalCIDCid: any;
  // modalCIDCidError = false;

  // modalCIDPassport: any;
  confirmDate: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  modalConfirmDate = false;
  modalDetails = false;
  list = [];
  historys = [];
  details = [];
  data: any = {};
  id: any;
  isLoadding = false;

  @ViewChild('modalHPVC') modalHPVC: HpvcComponent;
  constructor(
    private covidCaseService: CovidCaseService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getList();
    this.confirmDate = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('date')
      }
    };
  }


  async getList() {
    try {
      this.isLoadding = true;
      const rs: any = await this.covidCaseService.getCovidCase();
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
      this.isLoadding = false;
    } catch (error) {
      this.isLoadding = false;
      this.alertService.error(error);
    }
  }

  async getData(data) {
    await this.getInfo(data.covid_case_id);
    await this.getHistory(data.person_id);
  }

  async getInfo(id) {
    try {
      const rs: any = await this.covidCaseService.getCovidCaseInfo(id);
      if (rs.ok) {
        this.data = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getHistory(id) {
    try {
      const rs: any = await this.covidCaseService.getCovidCaseHistory(id);
      if (rs.ok) {
        this.historys = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getDetails(l) {
    this.modalDetails = true;
    try {
      const rs: any = await this.covidCaseService.getCovidCaseDetails(l.covid_case_id);
      console.log(rs);
      if (rs.ok) {
        this.details = rs.rows;
        console.log(this.details);
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  onEdit(l) {
    try {
      this.router.navigate(['/staff/covid-case-edit', { data: JSON.stringify(l) }]);
    } catch (error) {

    }
  }

  async onDelete(l) {
    try {
      const confirm = await this.alertService.deleted();
      if (confirm) {
        const rs: any = await this.covidCaseService.removeCase(l.covid_case_id);
        if (rs.ok) {
          await this.getList();
          this.alertService.success();
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);

    }
  }

  onClickOpenModalDateConfirm(l) {
    console.log(l);
    this.id = l.covid_case_id;
    this.modalConfirmDate = true;
  }

  async saevConfirmDate() {
    try {
      const date = `${this.confirmDate.date.year}-${this.confirmDate.date.month}-${this.confirmDate.date.day}`;
      const rs: any = await this.covidCaseService.updateConfrimDate(this.id, date);
      if (rs.ok) {
        this.alertService.success();
        this.getList();
        this.id = null;
        this.modalConfirmDate = false;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);

    }
  }

  onClickHPVC() {
    this.modalHPVC.openModal();
  }
}
