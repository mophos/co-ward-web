import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions } from '@tanjaae/mydatepicker'
import { PatientsProvinceService } from '../../services-new-report/patients-province.service'
import { CalculateService } from '../../services-new-report/calculate.service';
import moment from 'moment';

@Component({
  selector: 'app-report-patients-province',
  templateUrl: './report-patients-province.component.html',
  styleUrls: ['./report-patients-province.component.css']
})
export class ReportPatientsProvinceComponent implements OnInit {

  isLoading = false
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
  // date:any = {
  //   date: {
  //     year: moment().year(),
  //     month: moment().month() + 1,
  //     day: moment().date()
  //   }
  // }
  date:any = {
    date: {
      year: 2020,
      month: 4,
      day: 27
    }
  }
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private patientsProvinceService: PatientsProvinceService,
    private cal: CalculateService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  checkExist () {
    let check = false
    this.items.forEach((item) => {
      if (item.length) {
        check = true
      }
    })
    return check
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
      const res:any = await this.patientsProvinceService.getPatientProvince({
        date,
        zone: this.zone
      })
      if (res.ok) {

        res.rows.forEach(item => {
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
        console.log(this.items)
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
      this.isLoading = false
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
      console.log(error)
    }
  }

  async exportExcel() {
    try {
      this.loading.show()
      const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.patientsProvinceService.exportExcelPatientProvince({ date })
      if (res) {
        this.downloadFile('รายงานผู้ป่วยรายจังหวัด', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

}
