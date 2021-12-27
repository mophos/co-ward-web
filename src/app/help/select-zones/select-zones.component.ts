import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-zones',
  templateUrl: './select-zones.component.html',
  styleUrls: ['./select-zones.component.css']
})
export class SelectZonesComponent implements OnInit {

  zones = [
    { name: 'เขต 01', code: '01' },
    { name: 'เขต 02', code: '02' },
    { name: 'เขต 03', code: '03' },
    { name: 'เขต 04', code: '04' },
    { name: 'เขต 05', code: '05' },
    { name: 'เขต 06', code: '06' },
    { name: 'เขต 07', code: '07' },
    { name: 'เขต 08', code: '08' },
    { name: 'เขต 09', code: '09' },
    { name: 'เขต 10', code: '10' },
    { name: 'เขต 11', code: '11' },
    { name: 'เขต 12', code: '12' },
    { name: 'เขต 13', code: '13' }
  ]
  selectedZone:any = []
  isSelectZone = false
  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  selectZone (value) {
    const index = this.selectedZone.findIndex(item => item.code === value.code)
    if (index > -1) {
      this.selectedZone.splice(index, 1)
    } else {
      this.selectedZone.push(value)
    }
    this.onselect.emit(this.selectedZone)
  }

  setSelectMultiZone () {
    this.isSelectZone = !this.isSelectZone
  }

  checkZone (zone) {
    return this.selectedZone.some(item => item.name === zone.name)
  }

}
