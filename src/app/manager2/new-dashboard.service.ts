import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NewDashboardService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getBedEachType () {
    const url = `${this.url}/`
    return this.http.get(url).toPromise()
  }

  getPatientEachIllness () {
    const url = `${this.url}/`
    return this.http.get(url).toPromise()
  }

  getPatientEachStatus () {
    const url = `${this.url}/`
    return this.http.get(url).toPromise()
  }

}
