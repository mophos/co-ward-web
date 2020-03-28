import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) { }

  getSuppiles() {
    const url = `${this.apiUrl}/v1/staff/supplies`;
    return this.http.get(url).toPromise();
  }
}
