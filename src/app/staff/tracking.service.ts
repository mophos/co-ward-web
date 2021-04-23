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
    const url = `${this.apiUrl}/v2/staff/pay`;
    return await this.http.get(url).toPromise();
  }

  async getPayDetails(id, con_no) {
    const url = `${this.apiUrl}/v2/staff/pay/${id}/${con_no}`;
    return await this.http.get(url).toPromise();
  }

}
