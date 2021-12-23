import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      return moment(value).format('HH:mm')
    } else {
      return '-'
    }
  }
}
