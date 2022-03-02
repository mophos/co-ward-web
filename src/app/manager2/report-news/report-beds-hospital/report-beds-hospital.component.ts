import { BasicService } from './../../../staff/services/basic.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { BedsHospitalService } from '../../services-new-report/beds-hospital.service'
import { CalculateService } from '../../services-new-report/calculate.service';
import * as moment from 'moment';
import { SelectProvincesComponent } from 'src/app/help/select-provinces/select-provinces.component';
import { BasicAuthService } from 'src/app/staff2/services/basic-auth.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-report-beds-hospital',
  templateUrl: './report-beds-hospital.component.html',
  styleUrls: ['./report-beds-hospital.component.css']
})
export class ReportBedsHospitalComponent implements OnInit {

  isLoading = false

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }
  date: any = {
    date: {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }
  }

  items: any = []
  zone = ''
  zones = [
    { name: 'เขต 01', value: '01' },
    { name: 'เขต 02', value: '02' },
    { name: 'เขต 03', value: '03' },
    { name: 'เขต 04', value: '04' },
    { name: 'เขต 05', value: '05' },
    { name: 'เขต 06', value: '06' },
    { name: 'เขต 07', value: '07' },
    { name: 'เขต 08', value: '08' },
    { name: 'เขต 09', value: '09' },
    { name: 'เขต 10', value: '10' },
    { name: 'เขต 11', value: '11' },
    { name: 'เขต 12', value: '12' },
    { name: 'เขต 13', value: '13' }
  ]
  provinceAll: any = [];
  provinces: any = []
  selectedProvince: any = []
  headers: any = [];
  subHeader: any = [];
  data: any = [];
  @ViewChild('loading', { static: true }) loading: any;
  @ViewChild('province', { static: false }) province: SelectProvincesComponent;

  constructor(
    private bedsHospitalService: BedsHospitalService,
    private basicService: BasicService,
    private cal: CalculateService
  ) { }

  ngOnInit() {
    this.getProvince();
    this.loadData('province')
  }

  async getProvince() {
    try {
      const rs: any = await this.basicService.getProvince();
      if (rs.ok) {
        const provinces = [];
        for (const item of rs.rows) {
          provinces.push({
            code: item.code,
            name: item.name_th,
            zone_code: item.zone_code
          });
        }
        this.provinces = provinces;
        this.provinceAll = provinces;
      }
    } catch (error) {

    }
  }
  clearData() {
    this.items = []
    this.selectedProvince = []
    this.province.clear()
  }

  selectDate(value) {
    this.date = {
      date: value.date
    }
    this.clearData()
    this.loadData('province')
  }

  async selectZone() {
    if (this.zone === '') {
      this.provinces = this.provinceAll;
    } else {
      this.provinces = _.filter(this.provinceAll, { zone_code: this.zone });
    }
    this.clearData();
    this.loadData('province');

  }

  updateProvince(value) {
    this.selectedProvince = value
    this.items = []
    this.loadData(null)
  }

  async loadData(filter) {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res: any = await this.bedsHospitalService.getBedHospital({
        date,
        zone: this.zone,
        province: this.selectedProvince
      })
      if (res.ok) {
        this.headers = res.headers;
        this.subHeader = res.subHeader;
        this.data = res.data;
        // const items = []

        // res.rows.forEach((row, i) => {
        //   row.forEach((x, j) => {
        //     if (!items.some(item => item.hospcode === x.hospcode)) {
        //       items.push({
        //         zone_code: x.zone_code,
        //         province_code: x.province_code,
        //         province_name: x.province_name,
        //         hospcode: x.hospcode,
        //         hospname: x.hospname,
        //         level: x.level,
        //         sub_ministry_name: x.sub_ministry_name
        //       })
        //     }

        //     const index = items.findIndex(item => item.hospcode === x.hospcode)
        //     if (index > -1) {
        //       if (x.bed_name === 'ระดับ3 ใส่ท่อและเครื่องช่วยหายใจ') {
        //         items[index].level3_total = x.total
        //         items[index].level3_used = x.used
        //       } else if (x.bed_name === 'ระดับ 2.2 Oxygen high flow') {
        //         items[index].level2_2_total = x.total
        //         items[index].level2_2_used = x.used
        //       } else if (x.bed_name === 'ระดับ 2.2 Oxygen high flow') {
        //         items[index].level2_2_total = x.total
        //         items[index].level2_2_used = x.used
        //       } else if (x.bed_name === 'ระดับ 2.1 Oxygen high low') {
        //         items[index].level2_1_total = x.total
        //         items[index].level2_1_used = x.used
        //       } else if (x.bed_name === 'ระดับ 1 ไม่ใช่ Oxygen') {
        //         items[index].level1_total = x.total
        //         items[index].level1_used = x.used
        //       } else if (x.bed_name === 'ระดับ 0 Home Isolation (stepdown)') {
        //         items[index].level0_total = x.total
        //         items[index].level0_used = x.used
        //       } else if (x.bed_name === 'Home Isolation') {
        //         items[index].home_isolation_total = x.total
        //         items[index].home_isolation_used = x.used
        //       } else if (x.bed_name === 'Community Isolation') {
        //         items[index].community_isolation_total = x.total
        //         items[index].community_isolation_used = x.used
        //       }
        //     }
        //   })
        // })



        // this.items = items
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  downloadFile(name, type, data: any) {
    try {
      const url = window.URL.createObjectURL(new Blob([data]))
      const fileName = `${name}.${type}`
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.setAttribute('style', 'display: none')
      a.href = url
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    } catch (error) {
      console.error(error)
    }
  }

  async exportExcel() {
    try {
      this.loading.show()
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res: any = await this.bedsHospitalService.exportExcelBedHospital({
        date,
        zone: this.zone,
        province: this.selectedProvince
      })
      if (res) {
        this.downloadFile('รายงานเตียงรายสถานพยาบาล', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

}
