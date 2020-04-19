import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { HelpService } from './help.service';
@Pipe({
  name: 'checkCutTime'
})
export class CheckCutTimePipe implements PipeTransform {

  timeCus: any;
  constructor(
    private helpService: HelpService
  ) {
    this.helpService.getDateCut().then((v: any) => { this.timeCus = v; });
  }
  // เช็คว่าวันที่ส่งเข้ามา cut time แล้วรึยัง
  transform(value: any, args?: any): any {
    if (this.timeCus.ok) {
      if (moment(value, 'YYYY-MM-DD').isValid() || moment(value, 'YYYY-MM-DD hh:mm:ss').isValid()) {
        if (this.timeCus.rows === value) {
          return false; // วันที่ตรงกัน
        } else {
          return true; // วันที่ไม่ตรงกัน
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
