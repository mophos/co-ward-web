import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { AlertService } from 'src/app/help/alert.service';
import { sumBy } from 'lodash';

@Component({
  selector: 'app-report-records',
  templateUrl: './report-records.component.html',
  styles: []
})
export class ReportRecordsComponent implements OnInit {
  list: any = [];

  person = 0;
  personTime = 0;
  personOld = 0;
  personOldTime = 0;
  personTotal = 0;
  personTimeTotal = 0;
  personDeath = 0;

  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      const rs: any = await this.reportService.getRecords();
      if (rs.ok) {
        this.list = rs.rows;
        this.person = sumBy(rs.rows, 'person');
        this.personTime = sumBy(rs.rows, 'person_time');
        this.personOld = sumBy(rs.rows, 'person_old');
        this.personOldTime = sumBy(rs.rows, 'person_old_time');
        this.personTotal = sumBy(rs.rows, 'person_total');
        this.personTimeTotal = sumBy(rs.rows, 'person_time_total');
        this.personDeath = sumBy(rs.rows, 'person_death');
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      console.log(error);
      this.alertService.error(error);
    }
  }
}
