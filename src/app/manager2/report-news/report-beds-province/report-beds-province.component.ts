import { Component, OnInit } from '@angular/core';
import { BedsProvinceService } from '../../serveices-new-report/beds-province.service'

@Component({
  selector: 'app-report-beds-province',
  templateUrl: './report-beds-province.component.html',
  styleUrls: ['./report-beds-province.component.css']
})
export class ReportBedsProvinceComponent implements OnInit {

  isLoading = true

  items:any = []

  constructor(
    private bedsProvinceService: BedsProvinceService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const res:any = await this.bedsProvinceService.getBedProvince()
      if (res.ok) {
        this.items = res.rows
        console.log(res.rows)
        this.isLoading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

}
