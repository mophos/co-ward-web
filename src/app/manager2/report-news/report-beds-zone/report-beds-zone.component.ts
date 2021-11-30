import { Component, OnInit, ViewChild } from '@angular/core';
import { BedsZoneService } from '../../serveices-new-report/beds-zone.service';

@Component({
  selector: 'app-report-beds-zone',
  templateUrl: './report-beds-zone.component.html',
  styleUrls: ['./report-beds-zone.component.css']
})
export class ReportBedsZoneComponent implements OnInit {

  isLoading = false

  items:any = []
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private bedsZoneService: BedsZoneService,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const res:any = await this.bedsZoneService.getBedZone()
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
      const res:any = await this.bedsZoneService.exportExcelBedZone()
      if (res) {
        this.downloadFile('รายงานเตียงรายเขต', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

}
