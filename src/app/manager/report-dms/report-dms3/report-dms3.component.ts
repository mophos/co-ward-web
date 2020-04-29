import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/help/alert.service';
import { ReportDmsService } from '../report-dms.service';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
@Component({
  selector: 'app-report-dms3',
  templateUrl: './report-dms3.component.html',
  styles: []
})
export class ReportDms3Component implements OnInit {
  @ViewChild('modalLoading') public modalLoading;
  constructor(
    private alertService: AlertService,
    private reportService: ReportDmsService, ) { }
  date: any;
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  ngOnInit() {
    this.date = {
      date: {
        year: moment().get('year'),
        month: moment().get('month') + 1,
        day: moment().get('day')
      }
    };
  }


  async onClickExport() {
    this.modalLoading.show();
    try {
      const rs: any = await this.reportService.getReport3Excel(`${this.date.date.year}-${this.date.date.month}-29`);
      console.log(rs);
      if (!rs) {
        this.modalLoading.hide();
      } else {
        this.downloadFile('รายงานการแจ้งจำนวนผู้ป่วยเพื่อเบิกเวชภัณฑ์​สิ้นเปลืองประจำวัน', 'xlsx', rs);
        this.modalLoading.hide();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
      this.modalLoading.hide();
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
