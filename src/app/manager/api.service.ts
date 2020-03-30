import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  checkBed() {
    const url = `${this.url}/v1/manager/services/check-bed`;
    return this.http.get(url).toPromise();
  }

}
