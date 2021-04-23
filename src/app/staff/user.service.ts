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
    const url = `${this.apiUrl}/v2/staff/users?query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async removeUser(id) {
    const url = `${this.apiUrl}/v2/staff/users/remove/${id}`;
    return this.http.delete(url).toPromise();
  }

  async getUserRight(userId, groupName) {
    const url = `${this.apiUrl}/v2/staff/users/get-user-right?userId=${userId}&groupName=${groupName}`;
    return await this.http.get(url).toPromise();
  }

  async updateUserRight(data: any, id: any) {
    const url = `${this.apiUrl}/v2/staff/users/update-user-right/${id}`;
    return this.http.put(url, { data }).toPromise();
  }
}
