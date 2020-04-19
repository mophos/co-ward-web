import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getListChildNode() {
    const url = `${this.url}/v1/basic-auth/list-child-node`;
    return this.http.get(url).toPromise();
  }

  async getDateCut() {
    const url = `${this.url}/date-time-cut`;
    return await this.http.get(url).toPromise();
  }
}
