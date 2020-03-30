import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getHospCode(hopsCode) {
    const url = `${this.url}/register/hopscode?hopsCode=${hopsCode}`;
    return this.http.get(url).toPromise();
  }
}
