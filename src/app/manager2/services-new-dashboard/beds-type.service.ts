import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedsTypeService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getBedType (params) {
    const url = `${this.url}/v1/new-manager/report-all/bed-report-overview?start=${params.startDate}&end=${params.endDate}`;
    return this.http.get(url).toPromise();
  }
}
