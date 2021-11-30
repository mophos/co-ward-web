import { Component, OnInit } from '@angular/core';
import { BedsHospitalService } from '../../serveices-new-report/beds-hospital.service'

@Component({
  selector: 'app-report-beds-hospital',
  templateUrl: './report-beds-hospital.component.html',
  styleUrls: ['./report-beds-hospital.component.css']
})
export class ReportBedsHospitalComponent implements OnInit {

  isLoading = false

  items:any = []

  constructor(
    private bedsHospitalService: BedsHospitalService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const res:any = await this.bedsHospitalService.getBedHospital()
      if (res.ok) {
        this.items = res.rows
        console.log('beds hospital ', res.rows)
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

}
