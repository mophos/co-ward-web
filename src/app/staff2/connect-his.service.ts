import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectHisService {

  constructor(
    private http: HttpClient, @Inject('API_URL') private url: string
  ) { }

  signInIctPortal (payload) {
    return this.http.post('https://oauth.moph.go.th/v1/login', payload).toPromise()
  }

  submitCovidCasePerson (token, payload) {
    // return this.http.post(`${this.url}/covid-case/person`, payload).toPromise()
    return this.http.post(
      'https://api-coward.moph.go.th/test/api/v1/covid-case/person',
      payload,
      {
        headers: {
          Authorization : `Bearer ${token}`
        }
      }
    ).toPromise()
  }

  submitCovidCasePatient (token, payload) {
    // return this.http.post(`${this.url}/covid-case-person`, payload).toPromise()
    return this.http.post(
      'https://api-coward.moph.go.th/test/api/v1/covid-case/patient',
      payload,
      {
        headers: {
          Authorization : `Bearer ${token}`
        }
      }
    ).toPromise()
  }

  submitCovidCaseVisit (token, payload) {
    // return this.http.post(`${this.url}/covid-case-person`, payload).toPromise()
    return this.http.post(
      'https://api-coward.moph.go.th/test/api/v1/covid-case/visit',
      payload,
      {
        headers: {
          Authorization : `Bearer ${token}`
        }
      }
    ).toPromise()
  }

}
