import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-colab-check',
  templateUrl: './report-colab-check.component.html',
  styles: []
})
export class ReportColabCheckComponent implements OnInit {

  loadings = false;
  list = [];
  limit = 100;
  totalList = 0;
  constructor() { }

  ngOnInit() {
  }

}
