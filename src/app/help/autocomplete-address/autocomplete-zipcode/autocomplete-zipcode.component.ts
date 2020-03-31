import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { AlertService } from '../../../help/alert.service';

@Component({
  selector: 'app-autocomplete-zipcode',
  templateUrl: './autocomplete-zipcode.component.html',
  styles: []
})
export class AutocompleteZipcodeComponent implements OnInit {

  token: any;
  query: any = null;
  searchUrl: any;
  length: any;
  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onchange: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: boolean;
  @Input() placeholder: string;

  @Input('length')
  set setLength(value: number) {
    this.length = value;
    this.setApi();
  }

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private alertService: AlertService) {
    this.searchUrl = `${this.apiUrl}/v1/staff/setting/autocomplete/zipcode`;
  }

  ngOnInit() {
    if (!this.placeholder) {
      this.placeholder = 'ค้นหา';
    }
    if (!this.query) {
      this.query = null;
    }
  }

  handleResultSelected(event: any) {
    this.onselect.emit(event);
    this.query = event ? event.zip_code : null;
  }

  setApi() {
    this.searchUrl = `${this.apiUrl}/v1/staff/setting/autocomplete/zipcode?length=${this.length}`;
  }

  setQuery(q: string) {
    this.query = q;
  }

}
