import { Component, OnInit } from '@angular/core';
import { BedsZoneService } from '../../serveices-new-report/beds-zone.service';

@Component({
  selector: 'app-report-beds-zone',
  templateUrl: './report-beds-zone.component.html',
  styleUrls: ['./report-beds-zone.component.css']
})
export class ReportBedsZoneComponent implements OnInit {

  items:any = []

  constructor(
    private bedsZoneService: BedsZoneService,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData () {
    const res:any = await this.bedsZoneService.getBedZone()
    try {
      if (res.ok) {
        this.items = res.rows
        console.log(res.rows)
      }
    } catch (error) {
      console.error(error)
    }
  }

}
