
import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { AlertService } from '../../help/alert.service';

@Component({
  selector: 'app-autocomplete-hospital',
  templateUrl: './autocomplete-hospital.component.html',
  styles: []
})
export class AutocompleteHospitalComponent implements OnInit {

  token: any;
  query: any = null;
  searchUrl: any;
  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onchange: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: boolean;
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private alertService: AlertService) {
    this.searchUrl = `${this.apiUrl}/register/hospcode/autocomplete/search`;
  }

  ngOnInit() {
  }

  onKey(e) {
    if (e.keyCode === 8) {
      this.onselect.emit({});
    }

  }
  handleResultSelected(event: any) {
    this.onselect.emit(event);
    this.query = event ? event.hospname : null;
  }

  setQuery(q: string) {
    this.query = q;
  }
}

