import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestockService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getRestock(limit, offset) {
    const url = `${this.url}/v1/admin/restock?&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  getRestockApproved(limit, offset) {
    const url = `${this.url}/v1/admin/restock/approved?&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  createRestock() {
    const url = `${this.url}/v1/admin/restock/create`;
    return this.http.get(url).toPromise();
  }

  import(data) {
    const url = `${this.url}/v1/admin/restock/import`;
    return this.http.post(url, { data }).toPromise();
  }

  getListHospital(restockId, typesId) {
    const url = `${this.url}/v1/admin/restock/list-hospital?restockId=${restockId}&typesId=${typesId}`;
    return this.http.get(url).toPromise();
  }

  getListSupplies(id) {
    const url = `${this.url}/v1/admin/restock/list-supplies?restockDetailId=${id}`;
    return this.http.get(url).toPromise();
  }

  updateSupplies(data: any, id: any) {
    const url = `${this.url}/v1/admin/restock/update-supplies/${id}`;
    return this.http.put(url, { data }).toPromise();
  }

  removeRestock(id: any) {
    const url = `${this.url}/v1/admin/restock/remove-restock/${id}`;
    return this.http.put(url, {}).toPromise();
  }

  getSupplies() {
    const url = `${this.url}/v1/admin/restock/suppiles`;
    return this.http.get(url).toPromise();
  }

}
