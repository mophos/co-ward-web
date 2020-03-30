import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loadding',
  templateUrl: './loadding.component.html',
  styleUrls: ['./loadding.component.css']
})
export class LoaddingComponent implements OnInit {

  opened = false;
  constructor() { }

  ngOnInit() {
  }

  show() {
    this.opened = true;
    // setTimeout(() => {
    // }, 500);
  }

  hide() {
    setTimeout(() => {
      this.opened = false;
    }, 500);
  }

}
