import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      return moment(value).format('DD-MM-YYYY HH:mm')
    } else {
      return '-'
    }
  }
}
