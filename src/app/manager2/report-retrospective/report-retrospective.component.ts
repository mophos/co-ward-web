import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
// import { Component, OnInit, ViewChild } from '@angular/core'
import { ReportService } from '../report.service'

@Component({
  selector: 'app-report-retrospective',
  templateUrl: './report-retrospective.component.html',
  styleUrls: ['./report-retrospective.component.css']
})
export class ReportRetrospectiveComponent implements OnInit {
  private date:any = moment().format('DD/MM/YYYY')
  private items:any = []
  // @ViewChild('loading' ,{ static: true }) loading: any;
  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.getRetrospective()
  }

  async getRetrospective () {
    try {
      // this.loading.show()
      const res = await this.reportService.reportRetrospective()
      if (res) {
        this.items = res
        // this.loading.hide()
        // this.items = res
      }
    } catch (error) {
      console.error(error)
    }
  }

}
