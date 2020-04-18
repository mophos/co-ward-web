import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async getUser(query = '') {
    const url = `${this.apiUrl}/v1/staff/users?query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async removeUser(id) {
    const url = `${this.apiUrl}/v1/staff/users/remove/${id}`;
    return this.http.delete(url).toPromise();
  }

  
}
