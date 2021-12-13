import { Injectable } from '@angular/core';
import { sumBy } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }

  checkValue (value) {
    if (value !== undefined && (value !== null && !isNaN(value))) {
      return value
    }
    return '-'
  }

  sumField (value) {
    let sum = 0
    const keys = Object.keys(value)
    keys.forEach(key => {
      if (key !== 'zone_code') {
        if (value[key] !== null && value[key] !== undefined) {
          sum += value[key]
        }
      }
    })
    return sum
  }

  sumZone (items, value) {
    return sumBy(items, value)
  }

  sum12Zone (items, value) {
    return sumBy(items, value) - items[12][value]
  }

  sum12ZoneByProvince (items, value) {
    let sum = 0
    items.forEach(item => {
      sum += sumBy(item, value) || 0
    })
    return sum - (items[12].length ? items[12][0][value] : 0)
  }

  sumAllZone (items, value) {
    return sumBy(items, value)
  }

  sumAllZoneByProvince (items, value) {
    let sum = 0
    items.forEach(item => {
      sum += sumBy(item, value) || 0
    })
    return sum
  }

}
