import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestProductsService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }


  async getList() {
    const url = `${this.apiUrl}/v2/staff/request-products`;
    return await this.http.get(url).toPromise();
  }

  async getProductType() {
    const url = `${this.apiUrl}/v2/staff/request-products/product-types`;
    return await this.http.get(url).toPromise();
  }

  async getProducts(typeId) {
    const url = `${this.apiUrl}/v2/staff/request-products/products?typeId=${typeId}`;
    return await this.http.get(url).toPromise();
  }

  async sgetSupplieStock() {
    const url = `${this.apiUrl}/v2/staff/supplies`;
    return await this.http.get(url).toPromise();
  }

  async save(data) {
    const url = `${this.apiUrl}/v2/staff/request-products`;
    return await this.http.post(url, { data }).toPromise();
  }

  async getSupplieDetails(id) {
    const url = `${this.apiUrl}/v2/staff/request-products/details/${id}`;
    return await this.http.get(url).toPromise();
  }

}
