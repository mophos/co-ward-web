import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeSurgicalService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList(query = '') {
    const url = `${this.url}/v2/admin/node-surgical/get-hopsnode-surgical?query=${query}`;
    return this.http.get(url).toPromise();
  }

  getListDetail(id) {
    const url = `${this.url}/v2/admin/node-surgical/get-hopsnode-surgical-detail?id=${id}`;
    return this.http.get(url).toPromise();
  }

  saveDetail(addHops: any, nodeId: any) {
    const _url = `${this.url}/v2/admin/node-surgical/save-detail?nodeId=${nodeId}&addHops=${addHops}`;
    return this.http.post(_url, {}).toPromise();
  }
}
