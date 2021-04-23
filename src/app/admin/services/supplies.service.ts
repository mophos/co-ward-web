import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList(query = '', limit, offset) {
    const url = `${this.url}/v2/admin/supplies?query=${query}&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  getListTotal(query = '') {
    const url = `${this.url}/v2/admin/supplies/total?query=${query}`;
    return this.http.get(url).toPromise();
  }

  save(data: any) {
    const url = `${this.url}/v2/admin/supplies`;
    return this.http.post(url, { data }).toPromise();
  }

  update(data: any, id: any) {
    const url = `${this.url}/v2/admin/supplies/${id}`;
    return this.http.put(url, { data }).toPromise();
  }

  remove(id: any) {
    const url = `${this.url}/v2/admin/supplies/${id}`;
    return this.http.delete(url).toPromise();
  }

  async getSupplieHospital() {
    const url = `${this.url}/v2/admin/supplies/check-supplie`;
    return await this.http.get(url).toPromise();
  }
}
