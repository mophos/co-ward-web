import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async getPayList() {
    const url = `${this.apiUrl}/v1/staff/pay`;
    return await this.http.get(url).toPromise();
  }

  async getPayDetails(id) {
    const url = `${this.apiUrl}/v1/staff/pay/${id}`;
    return await this.http.get(url).toPromise();
  }

}
