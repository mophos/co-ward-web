import { Component, OnInit, ViewChild } from '@angular/core';
import { BedsProvinceService } from '../../serveices-new-report/beds-province.service'

@Component({
  selector: 'app-report-beds-province',
  templateUrl: './report-beds-province.component.html',
  styleUrls: ['./report-beds-province.component.css']
})
export class ReportBedsProvinceComponent implements OnInit {

  isLoading = true

  items:any = []
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private bedsProvinceService: BedsProvinceService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const res:any = await this.bedsProvinceService.getBedProvince()
      if (res.ok) {
        this.items = res.rows
        console.log(res.rows)
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
      const res:any = await this.bedsProvinceService.exportExcelBedProvince()
      if (res) {
        this.downloadFile('รายงานเตียงรายจังหวัด', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

}
