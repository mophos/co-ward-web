import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-provinces',
  templateUrl: './select-provinces.component.html',
  styleUrls: ['./select-provinces.component.css']
})
export class SelectProvincesComponent implements OnInit {

  selectedProvince:any = []
  isSelectProvince = false
  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();
  @Input() provinces: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  selectProvince (value) {
    const index = this.selectedProvince.findIndex(item => item.code === value.code)
    if (index > -1) {
      this.selectedProvince.splice(index, 1)
    } else {
      this.selectedProvince.push(value)
    }
    this.onselect.emit(this.selectedProvince)
  }

  setSelectMultiProvince () {
    this.isSelectProvince = !this.isSelectProvince
  }

  checkProvince (province) {
    return this.selectedProvince.some(item => item.name === province.name)
  }

}
