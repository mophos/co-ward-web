import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // DD-MM-YYYY
    // DD/MM/YYYY
    // D MM YYYY
    // D MMM YYYY
    // D MMMM YYYY
    // DD/MM/YYYY hh:mm
    moment.locale('th');
    if (moment(value, 'YYYY-MM-DD').isValid() || moment(value, 'YYYY-MM-DD hh:mm:ss').isValid()) {
      let date;
      if (args) {
        if (args === 'DD-MM-YYYY') {
          date = moment(value).format('DD-MM-') + (moment(value).get('year') + 543);
        } else if (args === 'DD/MM/YYYY') {
          date = moment(value).format('DD/MM/') + (moment(value).get('year') + 543);
        } else if (args === 'DD/MM/YYYY hh:mm') {
          date = moment(value).format('DD/MM/') + (moment(value).get('year') + 543) + ' ' + moment(value).format('HH:mm') + ' น.';
        } else if (args === 'D MM YYYY') {
          date = moment(value).format('D MM ') + (moment(value).get('year') + 543);
        } else if (args === 'D MMMM YYYY') {
          date = moment(value).format('D MMMM ') + (moment(value).get('year') + 543);
        } else if (args === 'D MMM YYYY') {
          date = moment(value).format('D MMM ') + (moment(value).get('year') + 543);
        }
      } else {
        date = moment(value).format('D MMM ') + (moment(value).get('year') + 543);
      }
      return date;
    } else {
      return '-';
    }
  }

}
