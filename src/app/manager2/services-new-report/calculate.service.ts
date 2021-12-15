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

  getRemaining (num1, num2) {
    if (!num1 && !num2) {
      return '-'
    }
    return (num1 || 0) - (num2 || 0)
  }

  getSpecificBed (items, bed, key) {
    const data = items.find(item => item.bed_name === bed)
    if (data) {
      return data[key]
    }
    return undefined
  }

  sumSpecificBed12Zone (items, bed, key) {
    let sum = 0
    let dataZone13 = 0
    const zone13 = items[12].find(item => item.bed_name === bed)
    if (zone13) {
      dataZone13 = zone13[key]
    }

    items.forEach(item => {
      item.forEach(x => {
        if (x.bed_name === bed) {
          sum += x[key] || 0
        }
      })
    })
    return sum - dataZone13
  }

  sumSpecificBedAllZone (items, value, key) {
    let sum = 0
    items.forEach(item => {
      item.forEach(x => {
        if (x.bed_name === value) {
          sum += x[key] || 0
        }
      })
    })
    return sum
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
