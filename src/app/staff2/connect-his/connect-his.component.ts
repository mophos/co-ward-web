import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-connect-his',
  templateUrl: './connect-his.component.html',
  styleUrls: ['./connect-his.component.css']
})
export class ConnectHisComponent implements OnInit {

  file:any = null
  items:any = []

  constructor(
    private papa: Papa
  ) { }

  ngOnInit() {
  }

  onChange (event) {
    console.log('import file ', event.srcElement.files[0])
    this.file = event.srcElement.files[0]
  }

  onComplete (results) {
    this.items = results.data
    console.log('items data ', this.items)
  }

  importCsv () {
    this.papa.parse(this.file, {
      header: true,
      skipEmptyLines: true,
      complete: this.onComplete
    })
  }

}
