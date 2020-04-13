import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getTitle() {
    const url = `${this.apiUrl}/v1/basic/title`;
    return await this.http.get(url).toPromise();
  }
  async getDate() {
    const url = `${this.apiUrl}/date`;
    return await this.http.get(url).toPromise();
  }




}
