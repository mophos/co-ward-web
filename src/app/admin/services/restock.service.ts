import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
// import { ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RestockService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getRestock(limit, offset) {
    const url = `${this.url}/v2/admin/restock?&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  getRestockApproved(limit, offset) {
    const url = `${this.url}/v2/admin/restock/approved?&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  createRestock() {
    const url = `${this.url}/v2/admin/restock/create`;
    return this.http.get(url).toPromise();
  }

  import(data) {
    const url = `${this.url}/v2/admin/restock/import`;
    return this.http.post(url, { data }).toPromise();
  }

  importTemplete(data) {
    const url = `${this.url}/v2/admin/restock/import/templete/pay/now`;
    return this.http.post(url, { data }).toPromise();
  }

  save(data) {
    const url = `${this.url}/v2/admin/restock/create/pay-now`;
    return this.http.post(url, { data }).toPromise();
  }

  getListHospital(restockId, typesId) {
    const url = `${this.url}/v2/admin/restock/list-hospital?restockId=${restockId}&typesId=${typesId}`;
    return this.http.get(url).toPromise();
  }

  getListSupplies(id) {
    const url = `${this.url}/v2/admin/restock/list-supplies?restockDetailId=${id}`;
    return this.http.get(url).toPromise();
  }

  updateSupplies(data: any, id: any) {
    const url = `${this.url}/v2/admin/restock/update-supplies/${id}`;
    return this.http.put(url, { data }).toPromise();
  }

  removeRestock(id: any) {
    const url = `${this.url}/v2/admin/restock/remove-restock/${id}`;
    return this.http.put(url, {}).toPromise();
  }

  getSupplies() {
    const url = `${this.url}/v2/admin/restock/suppiles`;
    return this.http.get(url).toPromise();
  }

  approved(data) {
    const url = `${this.url}/v2/admin/restock/approved-all?data=${data}`;
    return this.http.get(url).toPromise();
  }

  async exportExcel(id) {
    const url = `${this.url}/v2/admin/restock/export/${id}`;
    // const headers = new HttpHeaders();
    // headers.append('timeout', '20000000');
    const resp: any = await this.http.get(url, {
      // headers: headers,
      responseType: 'blob'
    }).toPromise();
    return resp;
  }

  async exportExcelStatus(id) {
    const url = `${this.url}/v2/admin/restock/export-status/${id}`;
    const resp: any = await this.http.get(url, {
      responseType: 'blob'
    }).toPromise();
    return resp;
  }

  async exportTemplete() {
    const url = `${this.url}/v2/admin/restock/export/pay/now/`;
    const resp: any = await this.http.get(url, {
      responseType: 'blob'
    }).toPromise();
    return resp;
  }

}
