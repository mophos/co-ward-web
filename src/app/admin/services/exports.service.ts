import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async export(sDate, eDate) {
    const url = `${this.apiUrl}/v1/admin/export/requisition?startDate=${sDate}&endDate=${eDate}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
}
