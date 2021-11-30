import { Component, OnInit, ViewChild } from '@angular/core';
import { RespiratorService } from '../../serveices-new-report/respirator.service'

@Component({
  selector: 'app-report-respirator',
  templateUrl: './report-respirator.component.html',
  styleUrls: ['./report-respirator.component.css']
})
export class ReportRespiratorComponent implements OnInit {

  isLoading = false

  items:any = []
  @ViewChild('loading', { static: true }) loading: any;

  constructor(
    private respiratorService: RespiratorService
  ) { }

  ngOnInit() {
    // this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const res:any = await this.respiratorService.getRespirator()
      if (res.ok) {
        this.items = res.rows
        console.log('respirator ', res.rows)
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
      const res:any = await this.respiratorService.exportExcelRespirator()
      if (res) {
        this.downloadFile('รายงานการใช้เครื่องช่วยหายใจ', 'xlsx', res)
        this.loading.hide()
      }

    } catch (error) {
      console.log(error)
      this.loading.hide()
    }
  }

}
