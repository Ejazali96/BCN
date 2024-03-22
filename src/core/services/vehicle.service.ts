import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationConfig } from '../models/pagination-config.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  Save(body: any) {
    return this.http.post(`Vehicle/Save`, body)
  }

  Get(id: number) {
    return this.http.get(`Vehicle/Get?id=${id}`)
  }

  GetAll(model: PaginationConfig) {
    return this.http.get(`Vehicle/GetAll?page=${model.page}&size=${model.size}&search=${model.search}`)
  }

  GetAllTypes() {
    return this.http.get(`Vehicle/GetAllTypes`)
  }
}
