import { Injectable } from '@angular/core';
import { sumBy } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }

  sumZone (items, value) {
    return sumBy(items, value)
  }

  sum12Zone (items, value) {
    return sumBy(items, value) - items[12][value]
  }

  sum12ZoneByProvince (items, value) {
    let sum = 0
    items.forEach(item => {
      sum += sumBy(item, value)
    })
    return sum - items[12][0][value]
  }

  sumAllZone (items, value) {
    return sumBy(items, value)
  }

  sumAllZoneByProvince (items, value) {
    let sum = 0
    items.forEach(item => {
      sum += sumBy(item, value)
    })
    return sum
  }

}
