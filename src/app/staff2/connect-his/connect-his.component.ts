import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import  * as moment from 'moment'
import { ConnectHisService } from '../connect-his.service';
import { NewAlertService } from 'src/app/help/new-alert.service';
@Component({
  selector: 'app-connect-his',
  templateUrl: './connect-his.component.html',
  styleUrls: ['./connect-his.component.css']
})
export class ConnectHisComponent implements OnInit {

  file:any = null
  items:any = []
  modal = false
  token = null
  form = {
    username: '',
    password: ''
  }

  @ViewChild('loading', { static: true }) loading: any;
  @ViewChild('takeInput', {static: false}) InputVar: ElementRef;

  constructor(
    private papa: Papa,
    private connectHisService: ConnectHisService,
    private newAlertService: NewAlertService
  ) { }

  ngOnInit() {
  }

  clearData () {
    this.InputVar.nativeElement.value = '';
    this.file = null
    this.items = []
  }

  setModal (value) {
    this.modal = value
  }

  onChange (event) {
    this.file = event.srcElement.files[0]

    if (this.file) {
      this.papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          this.onComplete(results)
        }
      })
    }
  }

  async onComplete (results) {
    this.items = results.data
  }

  async loginIctPortal () {
    try {
      const res:any = await this.connectHisService.signInIctPortal({
        username: this.form.username,
        password: this.form.password
      })
      if (res.ok) {
        this.token = res.token
        this.setModal(false)
        this.newAlertService.alert({
          type: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          text: 'กรุณากด Import ข้อมูลอีกครั้ง'
        })
      } else {
        this.newAlertService.alert({
          type: 'error',
          title: '',
          text: res.error
        })
      }
    } catch (error) {
      this.newAlertService.alert({
        type: 'error',
        title: '',
        text: error
      })
      this.setModal(false)
    }
  }

  async importCsv () {
    if (this.token) {
      try {
        this.loading.show()
        this.items.forEach(async (item, i) => {
          const person:any = await this.connectHisService.submitCovidCasePerson(this.token, {
            cid: item.cid || '',
            passport: item.passport || null,
            first_name: item.first_name || '',
            middle_name: item.middle_name || '',
            last_name: item.last_name || '',
            gender_id: Number(item.gender_id) || 1,
            birth_date: moment(item.birth_date, 'DD/MM/YYYY', 'Asia/Bangkok').format('YYYY-MM-DD'),
            title_id: Number(item.title_id) || 1,
            telephone: item.telephone || '',
            people_type: Number(item.people_type) || 1,
            house_no: item.house_no || '',
            room_no: item.room_no || '',
            village: item.village || '',
            village_name: item.village_name || '',
            road: item.road || '',
            tambon_name: item.tambon_name || '',
            ampur_name: item.ampur_name || '',
            province_name: item.province_name || '',
            zipcode: item.zipcode || '',
            country_code: item.country_code || '',
            current_house_no: item.current_house_no || '',
            current_room_no: item.current_room_no || '',
            current_village: item.current_village || '',
            current_village_name: item.current_village_name || '',
            current_road: item.current_road || '',
            current_zipcode: item.current_zipcode || '',
            current_tambon_name: item.current_tambon_name || '',
            current_ampur_name: item.current_ampur_name || '',
            current_province_name: item.current_province_name || ''
          })
          if (person.ok) {
            const patient:any = await this.connectHisService.submitCovidCasePatient(this.token, {
              hn: item.hn || '',
              person_id: person.rows.person_id || 0
            })
            if (patient.ok) {
              const dateAdmit = moment(item.date_admit, 'DD/MM/YYYY', 'Asia/Bangkok')
              const dateNow = moment()
              const diff = dateNow.diff(dateAdmit, 'days')
              const details = []

              for (let i = 0; i <= diff; i++) {
                const admit = item[`admit${i + 1}`].split(',')
                const drugs = item[`drug${i + 1}`].split(',')
                const drugsNumber = []

                drugs.forEach(drug => {
                  drugsNumber.push(Number(drug))
                })

                details.push({
                  entry_date: moment(admit[0], 'DD/MM/YYYY', 'Asia/Bangkok').format('YYYY-MM-DD'),
                  severity_id: Number(admit[1]),
                  bed_id: Number(admit[2]),
                  medical_supplies_id: Number(admit[3]),
                  drugs: drugsNumber
                })
              }

              const visit:any = await this.connectHisService.submitCovidCaseVisit(this.token, {
                patient_id: patient.rows.patient_id || 0,
                an: item.an || '',
                date_admit: moment(item.date_admit, 'DD/MM/YYYY', 'Asia/Bangkok').format('YYYY-MM-DD'),
                confirm_date: moment(item.confirm_date, 'DD/MM/YYYY', 'Asia/Bangkok').format('YYYY-MM-DD'),
                case_status: item.case_status,
                details
              })
              if (visit.ok) {
                this.newAlertService.alert({
                  type: 'success',
                  title: 'Import ข้อมูลสำเร็จ',
                  text: ''
                })
                this.clearData()
                this.loading.hide()
              } else {
                this.clearData()
                this.newAlertService.alert({
                  type: 'error',
                  title: visit.error,
                  text: ''
                })
                this.loading.hide()
              }
            }
          }
        })
      } catch (error) {
        this.newAlertService.alert({
          type: 'error',
          title: error,
          text: ''
        })
        this.clearData()
        this.loading.hide()
      }
    } else {
      this.setModal(true)
    }
  }

}
