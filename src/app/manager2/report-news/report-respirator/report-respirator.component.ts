import { Component, OnInit } from '@angular/core';
import { RespiratorService } from '../../serveices-new-report/respirator.service'

@Component({
  selector: 'app-report-respirator',
  templateUrl: './report-respirator.component.html',
  styleUrls: ['./report-respirator.component.css']
})
export class ReportRespiratorComponent implements OnInit {

  items:any = []

  constructor(
    private respiratorService: RespiratorService
  ) { }

  ngOnInit() {
    // this.loadData()
  }

  async loadData () {
    try {
      const res:any = await this.respiratorService.getRespirator()
      if (res.ok) {
        this.items = res.rows
        console.log('respirator ', res.rows)
      }
    } catch (error) {
      console.error(error)
    }
  }

}
