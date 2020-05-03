import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportDmsService } from '../report-dms.service';
import { AlertService } from '../../../help/alert.service';
// import { sumBy } from 'lodash';

@Component({
  selector: 'app-report-review-homework',
  templateUrl: './report-review-homework.component.html',
  styles: []
})
export class ReportReviewHomeworkComponent implements OnInit {

  @ViewChild('loading') loading: any;

  sum1 = 0;
  sum2 = 0;
  list = [];
  sector: any;
  constructor(
    private reportService: ReportDmsService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.params;
    // this.route.queryParams.subscribe((params) => {
    this.sector = params.sector;
    console.log(this.sector);
    // });

  }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    try {
      this.loading.show();
      const rs: any = await this.reportService.getReportReviewHomework(this.sector);
      if (rs.ok) {
        this.list = rs.rows;
        for (const i of rs.rows) {
          this.sum2++;
          if (i.register_last_date) {
            this.sum1++;
          }
        }
      } else {
        this.alertService.error(rs.error);
      }
      this.loading.hide();
    } catch (error) {
      this.loading.hide();
      this.alertService.error(error);
    }
  }
}
