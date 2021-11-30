import { Component, OnInit } from '@angular/core';
import { RespiratorService } from '../../serveices-new-report/respirator.service'

@Component({
  selector: 'app-report-respirator',
  templateUrl: './report-respirator.component.html',
  styleUrls: ['./report-respirator.component.css']
})
export class ReportRespiratorComponent implements OnInit {

  isLoading = false

  items:any = []

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

}
