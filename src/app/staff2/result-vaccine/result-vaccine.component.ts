import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-vaccine',
  templateUrl: './result-vaccine.component.html',
  styleUrls: ['./result-vaccine.component.css']
})
export class ResultVaccineComponent implements OnInit {

  nationalId = ''
  user = {
    prefix: '',
    first_name: '',
    last_name: '',
    age: '',
    nationalId: ''
  }
  orders = []
  historys = []

  constructor() { }

  ngOnInit() {
  }

  search () {
    console.log(this.nationalId)
    this.nationalId = ''
    this.loadData()
  }

  loadData () {
    this.user = {
      prefix: 'Mr.',
      first_name: 'Peerapong',
      last_name: 'Roylarp',
      age: '18',
      nationalId: '1779900239760'
    }

    this.orders = [
      {
        hospital: 'โรงพยาบาลเปาโลเมโมเรียล',
        dateTime: '2022-01-01 09:30',
        type: 'normal'
      }
    ]

    this.historys = [
      {
        hospital: 'โรงพยาบาลเปาโลเมโมเรียล',
        vaccine_name: 'วัคซีน Covid 19 - AstraZeneca',
        date_time: '2021-08-18 09:30',
        date_time_appoint: ''
      },
      {
        hospital: 'โรงพยาบาลเปาโลเมโมเรียล',
        vaccine_name: 'วัคซีน Covid 19 - AstraZeneca',
        date_time: '2021-11-10 08:53',
        date_time_appoint: ''
      }
    ]
  }

}
