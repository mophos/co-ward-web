import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import provinceJson from '../../../../../assets/provinces.json'
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { HospitalService } from '../../../hospital.service';

@Component({
  selector: 'app-beds-type',
  templateUrl: './beds-type.component.html',
  styleUrls: ['./beds-type.component.css']
})
export class BedsTypeComponent implements OnInit {

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    showClearDateBtn: false
  }

  items:any = []
  zone = ''
  zones = [
    { name: 'เขต 01', value: '01' },
    { name: 'เขต 02', value: '02' },
    { name: 'เขต 03', value: '03' },
    { name: 'เขต 04', value: '04' },
    { name: 'เขต 05', value: '05' },
    { name: 'เขต 06', value: '06' },
    { name: 'เขต 07', value: '07' },
    { name: 'เขต 08', value: '08' },
    { name: 'เขต 09', value: '09' },
    { name: 'เขต 10', value: '10' },
    { name: 'เขต 11', value: '11' },
    { name: 'เขต 12', value: '12' },
    { name: 'เขต 13', value: '13' }
  ]
  provinceGroup = []
  displayProvince = ''
  provinces = provinceJson.data
  isSelectProvince = false
  ministryCode = ''
  listMinistry:any = []
  listSubMinistry: any = []

  startDate:any = {
    date: {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }
  }

  endDate:any = {
    date: {
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }
  }

  highcharts = Highcharts;

  pieChartOptions = {}
  stackChartOptions = {}

  report:any = {
    total: 39552,
    usageTotal: 15982,
    empty: 23570,
    usageTotalPercentage: 40.4,
    data: [
      {
        title: 'ระดับ 3',
        usage: 75,
        empty: 90
      },
      {
        title: 'ระดับ 2.2',
        usage: 85,
        empty: 66
      },
      {
        title: 'ระดับ 2.1',
        usage: 107,
        empty: 79
      },
      {
        title: 'ระดับ 1',
        usage: 427,
        empty: 319
      },
      {
        title: 'ระดับ 0',
        usage: 1306,
        empty: 836
      }
    ]
  }

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit() {
    // this.getMinistryList()
    // this.getSubMinistryList()
    this.loadData()
    this.setPieChartBed()
    this.setStackChartBed()
  }

  selectStartDate (value) {
    this.startDate = {
      date: value.date
    }
    // TODO : RE GET DATA
    // this.loadData()
  }

  selectEndDate (value) {
    this.endDate = {
      date: value.date
    }
    // TODO : RE GET DATA
    // this.loadData()
  }

  selectMinistry () {
    // TODO : CHANGE MINISTRY AND GET DATA
  }

  selectZone () {
    // TODO : CHANGE ZONE AND GET DATA
  }

  selectBedType () {
    // TODO : CHANGE BED TYPE AND GET DATA
  }

  selectProvince (value) {
    const index = this.provinceGroup.findIndex(item => item === value)
    if (index > -1) {
      this.provinceGroup.splice(index, 1)
    } else {
      this.provinceGroup.push(value)
    }
    this.items = []
    this.loadData()
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.provinceGroup.some(item => item === province)
  }

  loadData () {
    // TODO : GET DATA
  }

  async getMinistryList() {
    try {
      const rs: any = await this.hospitalService.getMinistryList();
      if (rs.ok) {
        this.listMinistry = rs.rows;
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getSubMinistryList() {
    try {
      const rs: any = await this.hospitalService.getSubMinistryList();
      if (rs.ok) {
        this.listSubMinistry = rs.rows;
      }
    } catch (error) {
      console.error(error)
    }
  }

  setPieChartBed () {
    this.pieChartOptions = {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: ''
      },
      // tooltip: {
      //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      // },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
      colors: ['#E4E4E4', '#50B432'],
      series: [
        {
          name: '',
          data: [
            {
              name: 'เตียงว่าง',
              y: 59.6
            },
            {
              name: 'เตียงที่ถูกใช้งาน',
              y: 40.4
            }
          ]
        }
      ]
    }
  }

  setStackChartBed () {
    const labels = []
    const emptys = []
    const usages = []

    this.report.data.forEach(item => {
      labels.push(item.title)
    })

    this.report.data.forEach(item => {
      emptys.push(item.empty)
    })

    this.report.data.forEach(item => {
      usages.push(item.usage)
    })

    this.stackChartOptions = {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
        categories: labels
      },
      yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
              text: 'จำนวนเตียง'
          }
      },
      tooltip: {
          formatter: function () {
              return '<b>' + this.x + '</b><br/>' +
                  this.series.name + ': ' + this.y + ' เตียง'
          }
      },
      plotOptions: {
          column: {
              stacking: 'normal'
          }
      },
      colors: ['#E4E4E4', '#50B432'],
      series: [
        {
          name: 'เตียงว่าง',
          data: emptys,
        },
        {
          name: 'เตียงถูกใช้งาน',
          data: usages,
        }
      ]
    }
  }

}
