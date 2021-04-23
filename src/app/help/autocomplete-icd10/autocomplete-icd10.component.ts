import { AlertService } from 'src/app/help/alert.service';
import { BasicAuthService } from './../../staff/services/basic-auth.service';
import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-autocomplete-icd10',
  templateUrl: './autocomplete-icd10.component.html',
  styles: []
})
export class AutocompleteIcd10Component implements OnInit {

  token: any;
  query: any = null;
  searchUrl: any;
  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onchange: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: boolean;
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private alertService: AlertService) {
    this.searchUrl = `${this.apiUrl}/v1/basic-auth/icd10/autocomplete`;
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
    this.query = event ? event.code : null;
  }

  setQuery(q: string) {
    this.query = q;
  }
}

