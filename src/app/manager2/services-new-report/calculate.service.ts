import { Injectable } from '@angular/core';
import { sumBy } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }

  getPercent (total, used) {
    const value1 = total !== null && total !== undefined ? total : 0
    const value2 = used !== null && used !== undefined ? used : 0

    return ((value2 * 100) / value1) || 0
  }

  checkExistingZone (items) {
    let check = false
    items.forEach((item) => {
      if (item.length) {
        check = true
      }
    })
    return check
  }

  countExistingZone (items) {
    let count = 0
    items.forEach((item) => {
      if (item.length) {
        count++
      }
    })
    return count
  }

  checkValue (value) {
    if ((value !== undefined && value !== Infinity) && (value !== null && !isNaN(value))) {
      return value
    }
    return '-'
  }

  getRemaining (num1, num2) {
    if (!num1 && !num2) {
      return '-'
    }
    return (num1 || 0) - (num2 || 0)
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
