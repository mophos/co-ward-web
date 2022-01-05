import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { BedsZoneService } from '../../services-new-report/beds-zone.service';
import { CalculateService } from '../../services-new-report/calculate.service';
import moment from 'moment';

@Component({
  selector: 'app-report-beds-zone',
  templateUrl: './report-beds-zone.component.html',
  styleUrls: ['./report-beds-zone.component.css']
})
export class ReportBedsZoneComponent implements OnInit {

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

  items: any = [];
  headers: any = [];
  subHeader: any = [];
  data: any = [];
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private bedsZoneService: BedsZoneService,
    private cal: CalculateService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  selectDate(value) {
    this.date = {
      date: value.date
    }
    this.items = []
    this.loadData()
  }

  async loadData() {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res: any = await this.bedsZoneService.getBedZone({ date })
      if (res.ok) {
        this.headers = res.headers;
        this.subHeader = res.subHeader;
        this.data = res.data;
        // const items = []

        // res.rows.forEach((row, i) => {
        //   // if (!row.length) {
        //   //   items.push({})
        //   // }
        //   row.forEach((x, j) => {
        //     if (!items.some(item => item.zone_code === x.zone_code)) {
        //       items.push({
        //         zone_code: x.zone_code
        //       })
        //     }

        //     const index = items.findIndex(item => item.zone_code === x.zone_code)
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
      this.isLoading = false
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
      const res: any = await this.bedsZoneService.exportExcelBedZone({ date })
      if (res) {
        this.downloadFile('รายงานเตียงรายเขต', 'xlsx', res)
        this.loading.hide()
      }
    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

}
