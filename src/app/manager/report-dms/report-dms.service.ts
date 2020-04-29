import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportDmsService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) {

  }
}
