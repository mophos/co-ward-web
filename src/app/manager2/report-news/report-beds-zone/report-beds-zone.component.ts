import { Component, OnInit } from '@angular/core';
import { BedsZoneService } from '../../serveices-new-report/beds-zone.service';

@Component({
  selector: 'app-report-beds-zone',
  templateUrl: './report-beds-zone.component.html',
  styleUrls: ['./report-beds-zone.component.css']
})
export class ReportBedsZoneComponent implements OnInit {

  isLoading = false

  items:any = []

  constructor(
    private bedsZoneService: BedsZoneService,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData () {
    try {
      this.isLoading = true
      const res:any = await this.bedsZoneService.getBedZone()
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
