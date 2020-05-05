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

  async doExportExcel() {
    this.loading.show();
    try {
      const rs: any = await this.reportService.getReportReviewHomeworkExcel(this.sector);
      console.log(rs);
      if (!rs) {
        this.loading.hide();
      } else {
        this.downloadFile('report-review', 'xlsx', rs);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.loading.hide();
    }
  }

  downloadFile(name, type, data: any) {
    try {
      const url = window.URL.createObjectURL(new Blob([data]));
      console.log(url);
      const fileName = `${name}.${type}`;
      // Debe haber una manera mejor de hacer esto...
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
}
