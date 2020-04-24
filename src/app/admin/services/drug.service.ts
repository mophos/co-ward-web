import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList(query = '', limit, offset) {
    const url = `${this.url}/v1/admin/drugs?query=${query}&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  getListTotal(query = '') {
    const url = `${this.url}/v1/admin/drugs/total?query=${query}`;
    return this.http.get(url).toPromise();
  }

  save(data: any) {
    const url = `${this.url}/v1/admin/drugs`;
    return this.http.post(url, { data }).toPromise();
  }

  update(data: any, id: any) {
    const url = `${this.url}/v1/admin/drugs/${id}`;
    return this.http.put(url, { data }).toPromise();
  }

  remove(id: any) {
    const url = `${this.url}/v1/admin/drugs/${id}`;
    return this.http.delete(url).toPromise();
  }
}
