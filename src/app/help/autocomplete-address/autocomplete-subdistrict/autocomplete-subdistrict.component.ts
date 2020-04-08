import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { AlertService } from '../../../help/alert.service';

@Component({
  selector: 'app-autocomplete-subdistrict',
  templateUrl: './autocomplete-subdistrict.component.html',
  styles: []
})

export class AutocompleteSubdistrictComponent implements OnInit {

  token: any;
  query: any = null;
  searchUrl: any;
  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onchange: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: boolean;
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private alertService: AlertService) {
    this.searchUrl = `${this.apiUrl}/basic/autocomplete/tambon`;
  }

  ngOnInit() {
  }

  handleResultSelected(event: any) {
    this.onselect.emit(event);
    this.query = event ? event.tambon_name : null;
  }

  setQuery(q: string) {
    this.query = q;
  }

}
