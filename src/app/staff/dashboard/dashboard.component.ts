import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  url = 'https://app.powerbi.com/view?r=eyJrIjoiNTI1YTg4ZmUtZGNjZS00YTgxLWJmNzQtNzNiYzkwYzhkNTkwIiwidCI6IjUzOGMzZjc1LTJmNTUtNDcxZi04MWU1LTI2NGZmOGYzZjQ4MCIsImMiOjEwfQ%3D%3D';
  constructor() { }

  ngOnInit() {
  }

}
