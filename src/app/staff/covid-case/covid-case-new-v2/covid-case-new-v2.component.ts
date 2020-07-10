import { Component, OnInit } from '@angular/core';
import thaiIdCard from 'thai-id-card';

@Component({
  selector: 'app-covid-case-new-v2',
  templateUrl: './covid-case-new-v2.component.html',
  styleUrls: ['./covid-case-new-v2.component.css']
})
export class CovidCaseNewV2Component implements OnInit {

  cid: any = '';
  province = null;
  peopleType = null;
  caseType = null;
  cidError = true;
  constructor() { }

  ngOnInit() {
  }

  onKeyCid(e) {
    const cid = e.target.value;
    if (cid.length === 13) {
      if (thaiIdCard.verify(this.cid)) {
        this.cidError = false;
      } else {
        this.cidError = true;
      }
    } else {
      this.cidError = true;
    }
  }
}
