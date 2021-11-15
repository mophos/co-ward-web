import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultVaccineService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }
  
}
