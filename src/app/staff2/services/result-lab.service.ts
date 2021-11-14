import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultLabService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getResultLab () {
    const url = 'https://618f591050e24d0017ce16b5.mockapi.io/lab'
    return await this.http.get(url).toPromise()
  }
}
