import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/help/alert.service';
import { BedService } from '../bed.service';
import { findIndex, find } from 'lodash';
@Component({
  selector: 'app-bed-hosp-manage',
  templateUrl: './bed-hosp-manage.component.html',
  styleUrls: ['./bed-hosp-manage.component.css']
})
export class BedHospManageComponent implements OnInit {
  loading = false;
  list: any;
  listBed: any = [];
  listUsage: any;
  detail = {
    id: '',
    hospname: '',
    entry_date: '',
    aiir_qty: null,
    aiir_covid_qty: null,
    aiir_spare_qty: null,
    cohort_qty: null,
    cohort_covid_qty: null,
    cohort_spare_qty: null,
    cohort_icu_qty: null,
    cohort_icu_covid_qty: null,
    cohort_icu_spare_qty: null,
    hospitel_qty: null,
    hospitel_covid_qty: null,
    hospitel_spare_qty: null,
    isolate_qty: null,
    isolate_covid_qty: null,
    isolate_spare_qty: null,
    modified_aiir_qty: null,
    modified_aiir_covid_qty: null,
    modified_aiir_spare_qty: null,
    hospital_type: null
  };
  modal = false;
  listHospitel: any[];
  isSave: boolean;
  constructor(
    private bedService: BedService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    await this.getList();
  }


  async getList() {
    this.loading = true;
    try {
      const rs: any = await this.bedService.getHospBed();
      if (rs.ok) {
        this.list = rs.rows.bed;
        this.listUsage = rs.rows.sum;
        for (const item of this.listUsage) {
          const idx = findIndex(this.list, { id: item.hospital_id });
          if (idx > -1) {
            if (item.bed_id === 1) {
              this.list[idx].aiir_usage_qty = item.usage_qty;
            } else if (item.bed_id === 2) {
              this.list[idx].modified_aiir_usage_qty = item.usage_qty;
            } else if (item.bed_id === 3) {
              this.list[idx].isolate_usage_qty = item.usage_qty;
            } else if (item.bed_id === 4) {
              this.list[idx].cohort_usage_qty = item.usage_qty;
            } else if (item.bed_id === 7) {
              this.list[idx].hospitel_usage_qty = item.usage_qty;
            }
          }
        }

        // this.list = tmp.HOSPITAL;
        // this.listHospitel = tmp.HOSPITEL;

        // if (this.listId > 0) {
        //   this.getListDetail(this.listId);
        // } else if (this.list.length) {
        //   this.getListDetail(this.list[0].id);
        // }
      } else {
        this.alertService.error();
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  editBed(l) {
    this.detail = l;
    const b1: any = find(this.listUsage, { hospital_id: l.id, bed_id: 1 })
    const b2: any = find(this.listUsage, { hospital_id: l.id, bed_id: 2 })
    const b3: any = find(this.listUsage, { hospital_id: l.id, bed_id: 3 })
    const b4: any = find(this.listUsage, { hospital_id: l.id, bed_id: 4 })
    const b5: any = find(this.listUsage, { hospital_id: l.id, bed_id: 5 })
    const b7: any = find(this.listUsage, { hospital_id: l.id, bed_id: 7 })
    //     0: {bed_id: 1, name: "AIIR", qty: null, covid_qty: null, spare_qty: null}
    // 1: {bed_id: 2, name: "Modified AIIR", qty: null, covid_qty: null, spare_qty: null}
    // 2: {bed_id: 3, name: "Isolate", qty: null, covid_qty: null, spare_qty: null}
    // 3: {bed_id: 4, name: "Cohort", qty: null, covid_qty: null, spare_qty: null}
    // 4: {bed_id: 7, name: "Cohort ICU", qty: null, covid_qty: null, spare_qty: null}
    this.modal = true;
    if (this.detail.hospital_type === 'HOSPITAL') {
      this.listBed = [
        { bed_id: 1, name: 'AIIR', use_covid_qty: b1 ? b1.usage_qty : 0, qty: this.detail.aiir_qty, covid_qty: this.detail.aiir_covid_qty, spare_qty: this.detail.aiir_spare_qty },
        { bed_id: 2, name: 'Modified AIIR', use_covid_qty: b2 ? b2.usage_qty : 0, qty: this.detail.modified_aiir_qty, covid_qty: this.detail.modified_aiir_covid_qty, spare_qty: this.detail.modified_aiir_spare_qty },
        { bed_id: 3, name: 'Isolate', use_covid_qty: b3 ? b3.usage_qty : 0, qty: this.detail.isolate_qty, covid_qty: this.detail.isolate_covid_qty, spare_qty: this.detail.isolate_spare_qty },
        { bed_id: 4, name: 'Cohort', use_covid_qty: b4 ? b4.usage_qty : 0, qty: this.detail.cohort_qty, covid_qty: this.detail.cohort_covid_qty, spare_qty: this.detail.cohort_spare_qty },
        { bed_id: 7, name: 'Cohort ICU', use_covid_qty: b7 ? b7.usage_qty : 0, qty: this.detail.cohort_icu_qty, covid_qty: this.detail.cohort_icu_covid_qty, spare_qty: this.detail.cohort_icu_spare_qty }
      ]
    } else {
      this.listBed = [
        { bed_id: 4, name: 'Cohort', use_covid_qty: b4 ? b4.usage_qty : 0, qty: this.detail.cohort_qty, covid_qty: this.detail.cohort_covid_qty, spare_qty: this.detail.cohort_spare_qty },
        { bed_id: 5, name: 'Hospitel', use_covid_qty: b5 ? b5.usage_qty : 0, qty: this.detail.hospitel_qty, covid_qty: this.detail.hospitel_covid_qty, spare_qty: this.detail.hospitel_spare_qty },
      ]
    }



  }



  async onClickSave() {
    try {
      this.isSave = true;
      const rs: any = await this.bedService.saveBeds(this.detail.hospital_type === 'HOSPITAL' ? this.listBed : this.listBed, this.detail.id);
      if (rs.ok) {
        this.getList();
        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
      this.isSave = false;
    } catch (error) {
      this.isSave = false;
      this.alertService.error(error);
    }
  }
}
