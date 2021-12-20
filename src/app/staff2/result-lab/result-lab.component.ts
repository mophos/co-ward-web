import { Component, OnInit } from '@angular/core';
import { ResultLabService } from '../services/result-lab.service'

@Component({
  selector: 'app-result-lab',
  templateUrl: './result-lab.component.html',
  styleUrls: ['./result-lab.component.css']
})
export class ResultLabComponent implements OnInit {

  items: any;
  code: any;
  constructor(
    private resultLabService: ResultLabService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      // this.loading.show()
      const res = await this.resultLabService.getResultLab();
      if (res) {
        this.items = res;
        // this.loading.hide()
        // this.items = res
      }
    } catch (error) {
      console.error(error);
    }
  }

}
