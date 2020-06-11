import { Component, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '../services/exports.service';
import { AlertService } from '../../help/alert.service';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styles: []
})
export class ExportComponent implements OnInit {
  modal: any = false;
  sDate: any;
  eDate: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  @ViewChild('loading') loading: any;

  constructor(
    private alertService: AlertService,
    private exportService: ExportService
  ) { }

  ngOnInit() {
    this.sDate = {
      date: {
        year: moment().startOf('month').get('year'),
        month: moment().startOf('month').get('month') + 1,
        day: moment().startOf('month').get('date')
      }
    };

    this.eDate = {
      date: {
        year: moment().endOf('month').get('year'),
        month: moment().endOf('month').get('month') + 1,
        day: moment().endOf('month').get('date')
      }
    };
  }

  modalExport() {
    this.modal = true;
  }

  async export() {
    this.loading.show();
    try {
      const sDate = this.sDate.date.year + '-' + this.sDate.date.month + '-' + this.sDate.date.day;
      const eDate = this.eDate.date.year + '-' + this.eDate.date.month + '-' + this.eDate.date.day;
      const rs: any = await this.exportService.export(sDate, eDate);
      console.log(rs);
      if (!rs) {
      } else {
        this.downloadFile('report-requisition', 'xlsx', rs);
        this.loading.hide();
      }
    } catch (error) {
      console.log(error);
      this.loading.hide();
      this.alertService.error();
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
