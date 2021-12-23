import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { BedsProvinceService } from '../../services-new-report/beds-province.service'
import { CalculateService } from '../../services-new-report/calculate.service';
import moment from 'moment';

@Component({
  selector: 'app-report-beds-province',
  templateUrl: './report-beds-province.component.html',
  styleUrls: ['./report-beds-province.component.css']
})
export class ReportBedsProvinceComponent implements OnInit {

  isLoading = true
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
  items = [
    [], [], [], [], [],
    [], [], [], [], [],
    [], [], []
  ]
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }
  date:any = {
    date: {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }
  }
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private bedsProvinceService: BedsProvinceService,
    public cal: CalculateService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  clearData () {
    this.items = [
      [], [], [], [], [],
      [], [], [], [], [],
      [], [], []
    ]
  }

  selectZone () {
    this.clearData()
    this.loadData()
  }

  selectDate (value) {
    this.date = {
      date: value.date
    }
    this.clearData()
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.bedsProvinceService.getBedProvince({
        date,
        zone: this.zone
      })
      if (res.ok) {
        const items = []

        res.rows.forEach((row, i) => {
          row.forEach((x, j) => {
            if (!items.some(item => item.province_code === x.province_code)) {
              items.push({
                zone_code: x.zone_code,
                province_code: x.province_code,
                province_name: x.province_name,
              })
            }

            const index = items.findIndex(item => item.province_code === x.province_code)
            if (index > -1) {
              if (x.bed_name === 'ระดับ3 ใส่ท่อและเครื่องช่วยหายใจ') {
                items[index].level3_total = x.total
                items[index].level3_used = x.used
              } else if (x.bed_name === 'ระดับ 2.2 Oxygen high flow') {
                items[index].level2_2_total = x.total
                items[index].level2_2_used = x.used
              } else if (x.bed_name === 'ระดับ 2.2 Oxygen high flow') {
                items[index].level2_2_total = x.total
                items[index].level2_2_used = x.used
              } else if (x.bed_name === 'ระดับ 2.1 Oxygen high low') {
                items[index].level2_1_total = x.total
                items[index].level2_1_used = x.used
              } else if (x.bed_name === 'ระดับ 1 ไม่ใช่ Oxygen') {
                items[index].level1_total = x.total
                items[index].level1_used = x.used
              } else if (x.bed_name === 'ระดับ 0 Home Isolation (stepdown)') {
                items[index].level0_total = x.total
                items[index].level0_used = x.used
              } else if (x.bed_name === 'Home Isolation') {
                items[index].home_isolation_total = x.total
                items[index].home_isolation_used = x.used
              } else if (x.bed_name === 'Community Isolation') {
                items[index].community_isolation_total = x.total
                items[index].community_isolation_used = x.used
              }
            }
          })
        })

        items.forEach(item => {
          if (item.zone_code === '01') {
            this.items[0].push(item)
          } else if (item.zone_code === '02') {
            this.items[1].push(item)
          } else if (item.zone_code === '03') {
            this.items[2].push(item)
          } else if (item.zone_code === '04') {
            this.items[3].push(item)
          } else if (item.zone_code === '05') {
            this.items[4].push(item)
          } else if (item.zone_code === '06') {
            this.items[5].push(item)
          } else if (item.zone_code === '07') {
            this.items[6].push(item)
          } else if (item.zone_code === '08') {
            this.items[7].push(item)
          } else if (item.zone_code === '09') {
            this.items[8].push(item)
          } else if (item.zone_code === '10') {
            this.items[9].push(item)
          } else if (item.zone_code === '11') {
            this.items[10].push(item)
          } else if (item.zone_code === '12') {
            this.items[11].push(item)
          } else {
            this.items[12].push(item)
          }
        })
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  downloadFile (name, type, data: any) {
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
      const res:any = await this.bedsProvinceService.exportExcelBedProvince({
        date,
        zone: this.zone
      })
      if (res) {
        this.downloadFile('รายงานเตียงรายจังหวัด', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.error(error)
      this.loading.hide()
    }
  }

}
