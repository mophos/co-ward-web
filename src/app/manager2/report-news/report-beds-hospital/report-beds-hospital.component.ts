import { Component, OnInit, ViewChild } from '@angular/core';
import { BedsHospitalService } from '../../serveices-new-report/beds-hospital.service'

@Component({
  selector: 'app-report-beds-hospital',
  templateUrl: './report-beds-hospital.component.html',
  styleUrls: ['./report-beds-hospital.component.css']
})
export class ReportBedsHospitalComponent implements OnInit {

  isLoading = false

  items:any = []
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private bedsHospitalService: BedsHospitalService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const res:any = await this.bedsHospitalService.getBedHospital()
      if (res.ok) {
        this.items = res.rows
        console.log('beds hospital ', res.rows)
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
      console.log(error)
    }
  }

  async exportExcel() {
    try {
      this.loading.show()
      // const date = `${this.date.date.year}-${this.date.date.month}-${this.date.date.day}`
      const res:any = await this.bedsHospitalService.exportExcelBedHospital()
      if (res) {
        this.downloadFile('รายงานเตียงรายสถานพยาบาล', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

}
