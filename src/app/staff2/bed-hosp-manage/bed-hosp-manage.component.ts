import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/help/alert.service';
import { BedService } from '../bed.service';
import { findIndex, find } from 'lodash';
@Component({
  selector: 'app-bed-hosp-manage',
  templateUrl: './bed-hosp-manage.component.html',
  styleUrls: ['./bed-hosp-manage.component.css']
})
export class BedHospManageComponent implements OnInit {
  // loading = false;
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
    home_isolation_qty: null,
    home_isolation_covid_qty: null,
    home_isolation_spare_qty: null,
    community_isolation_qty: null,
    community_isolation_covid_qty: null,
    community_isolation_spare_qty: null,
    
    lv0_qty: null,
    lv0_covid_qty: null,
    lv0_spare_qty: null,
    lv1_qty: null,
    lv1_covid_qty: null,
    lv1_spare_qty: null,
    lv21_qty: null,
    lv21_covid_qty: null,
    lv21_spare_qty: null,
    lv22_qty: null,
    lv22_covid_qty: null,
    lv22_spare_qty: null,
    lv3_qty: null,
    lv3_covid_qty: null,
    lv3_spare_qty: null,
    hospital_type: null
  };
  modal = false;
  listHospitel: any[];
  isSave: boolean;
  @ViewChild('loading', { static: true }) loading: any;

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
              this.list[idx].cohort_icu_usage_qty = item.usage_qty;
            } else if (item.bed_id === 5) {
              this.list[idx].hospitel_usage_qty = item.usage_qty;
            } else if (item.bed_id === 8) {
              this.list[idx].home_isolation_usage_qty = item.usage_qty;
            } else if (item.bed_id === 9) {
              this.list[idx].community_isolation_usage_qty = item.usage_qty;
            } else if (item.bed_id === 10) {
              this.list[idx].lv0_usage_qty = item.usage_qty;
            } else if (item.bed_id === 11) {
              this.list[idx].lv1_usage_qty = item.usage_qty;
            } else if (item.bed_id === 12) {
              this.list[idx].lv21_usage_qty = item.usage_qty;
            } else if (item.bed_id === 13) {
              this.list[idx].lv22_usage_qty = item.usage_qty;
            } else if (item.bed_id === 14) {
              this.list[idx].lv3_usage_qty = item.usage_qty;
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
    const b1: any = find(this.listUsage, { hospital_id: l.id, bed_id: 1 });
    const b2: any = find(this.listUsage, { hospital_id: l.id, bed_id: 2 });
    const b3: any = find(this.listUsage, { hospital_id: l.id, bed_id: 3 });
    const b4: any = find(this.listUsage, { hospital_id: l.id, bed_id: 4 });
    const b5: any = find(this.listUsage, { hospital_id: l.id, bed_id: 5 });
    const b7: any = find(this.listUsage, { hospital_id: l.id, bed_id: 7 });
    const b8: any = find(this.listUsage, { hospital_id: l.id, bed_id: 8 });
    const b9: any = find(this.listUsage, { hospital_id: l.id, bed_id: 9 });
    const b10: any = find(this.listUsage, { hospital_id: l.id, bed_id: 10 });
    const b11: any = find(this.listUsage, { hospital_id: l.id, bed_id: 11 });
    const b12: any = find(this.listUsage, { hospital_id: l.id, bed_id: 12 });
    const b13: any = find(this.listUsage, { hospital_id: l.id, bed_id: 13 });
    const b14: any = find(this.listUsage, { hospital_id: l.id, bed_id: 14 });
    //     0: {bed_id: 1, name: "AIIR", qty: null, covid_qty: null, spare_qty: null}
    // 1: {bed_id: 2, name: "Modified AIIR", qty: null, covid_qty: null, spare_qty: null}
    // 2: {bed_id: 3, name: "Isolate", qty: null, covid_qty: null, spare_qty: null}
    // 3: {bed_id: 4, name: "Cohort", qty: null, covid_qty: null, spare_qty: null}
    // 4: {bed_id: 7, name: "Cohort ICU", qty: null, covid_qty: null, spare_qty: null}
    this.modal = true;
    if (this.detail.hospital_type === 'HOSPITAL') {
      this.listBed = [
        // { bed_id: 1, name: 'AIIR', use_covid_qty: b1 ? b1.usage_qty : 0, qty: this.detail.aiir_qty, covid_qty: this.detail.aiir_covid_qty, spare_qty: this.detail.aiir_spare_qty },
        // { bed_id: 2, name: 'Modified AIIR', use_covid_qty: b2 ? b2.usage_qty : 0, qty: this.detail.modified_aiir_qty, covid_qty: this.detail.modified_aiir_covid_qty, spare_qty: this.detail.modified_aiir_spare_qty },
        // { bed_id: 3, name: 'Isolate', use_covid_qty: b3 ? b3.usage_qty : 0, qty: this.detail.isolate_qty, covid_qty: this.detail.isolate_covid_qty, spare_qty: this.detail.isolate_spare_qty },
        // { bed_id: 4, name: 'Cohort', use_covid_qty: b4 ? b4.usage_qty : 0, qty: this.detail.cohort_qty, covid_qty: this.detail.cohort_covid_qty, spare_qty: this.detail.cohort_spare_qty },
        // { bed_id: 7, name: 'Cohort ICU', use_covid_qty: b7 ? b7.usage_qty : 0, qty: this.detail.cohort_icu_qty, covid_qty: this.detail.cohort_icu_covid_qty, spare_qty: this.detail.cohort_icu_spare_qty },
        { bed_id: 8, name: 'Home Isolation', use_covid_qty: b8 ? b8.usage_qty : 0, qty: this.detail.home_isolation_qty, covid_qty: this.detail.home_isolation_covid_qty, spare_qty: this.detail.home_isolation_spare_qty },
        { bed_id: 9, name: 'Community Isolation', use_covid_qty: b9 ? b9.usage_qty : 0, qty: this.detail.community_isolation_qty, covid_qty: this.detail.community_isolation_covid_qty, spare_qty: this.detail.community_isolation_spare_qty },
        { bed_id: 10, name: 'ระดับ 0 Home Isolation (stepdown)', use_covid_qty: b10 ? b10.usage_qty : 0, qty: this.detail.lv0_qty, covid_qty: this.detail.lv0_covid_qty, spare_qty: this.detail.lv0_spare_qty },
        { bed_id: 11, name: 'ระดับ 1 ไม่ใช้ Oxygen', use_covid_qty: b11 ? b11.usage_qty : 0, qty: this.detail.lv1_qty, covid_qty: this.detail.lv1_covid_qty, spare_qty: this.detail.lv1_spare_qty },
        { bed_id: 12, name: 'ระดับ 2.1 Oxygen low flow', use_covid_qty: b12 ? b12.usage_qty : 0, qty: this.detail.lv21_qty, covid_qty: this.detail.lv21_covid_qty, spare_qty: this.detail.lv21_spare_qty },
        { bed_id: 13, name: 'ระดับ 2.2 Oxygen high flow', use_covid_qty: b13 ? b13.usage_qty : 0, qty: this.detail.lv22_qty, covid_qty: this.detail.lv22_covid_qty, spare_qty: this.detail.lv22_spare_qty },
        { bed_id: 14, name: 'ระดับ3 ใส่ท่อและเครื่องช่วยหายใจ', use_covid_qty: b14 ? b14.usage_qty : 0, qty: this.detail.lv3_qty, covid_qty: this.detail.lv3_covid_qty, spare_qty: this.detail.lv3_spare_qty }
      ];
    } else {
      this.listBed = [
        // { bed_id: 4, name: 'Cohort', use_covid_qty: b4 ? b4.usage_qty : 0, qty: this.detail.cohort_qty, covid_qty: this.detail.cohort_covid_qty, spare_qty: this.detail.cohort_spare_qty },
        // { bed_id: 5, name: 'Hospitel', use_covid_qty: b5 ? b5.usage_qty : 0, qty: this.detail.hospitel_qty, covid_qty: this.detail.hospitel_covid_qty, spare_qty: this.detail.hospitel_spare_qty },
        { bed_id: 8, name: 'Home Isolation', use_covid_qty: b8 ? b8.usage_qty : 0, qty: this.detail.home_isolation_qty, covid_qty: this.detail.home_isolation_covid_qty, spare_qty: this.detail.home_isolation_spare_qty },
        { bed_id: 9, name: 'Community Isolation', use_covid_qty: b9 ? b9.usage_qty : 0, qty: this.detail.community_isolation_qty, covid_qty: this.detail.community_isolation_covid_qty, spare_qty: this.detail.community_isolation_spare_qty },
        { bed_id: 10, name: 'ระดับ 0 Home Isolation (stepdown)', use_covid_qty: b10 ? b10.usage_qty : 0, qty: this.detail.lv0_qty, covid_qty: this.detail.lv0_covid_qty, spare_qty: this.detail.lv0_spare_qty },
        { bed_id: 11, name: 'ระดับ 1 ไม่ใช้ Oxygen', use_covid_qty: b11 ? b11.usage_qty : 0, qty: this.detail.lv1_qty, covid_qty: this.detail.lv1_covid_qty, spare_qty: this.detail.lv1_spare_qty },
        { bed_id: 12, name: 'ระดับ 2.1 Oxygen low flow', use_covid_qty: b12 ? b12.usage_qty : 0, qty: this.detail.lv21_qty, covid_qty: this.detail.lv21_covid_qty, spare_qty: this.detail.lv21_spare_qty },
        { bed_id: 13, name: 'ระดับ 2.2 Oxygen high flow', use_covid_qty: b13 ? b13.usage_qty : 0, qty: this.detail.lv22_qty, covid_qty: this.detail.lv22_covid_qty, spare_qty: this.detail.lv22_spare_qty },
        { bed_id: 14, name: 'ระดับ3 ใส่ท่อและเครื่องช่วยหายใจ', use_covid_qty: b14 ? b14.usage_qty : 0, qty: this.detail.lv3_qty, covid_qty: this.detail.lv3_covid_qty, spare_qty: this.detail.lv3_spare_qty }
      ];
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
