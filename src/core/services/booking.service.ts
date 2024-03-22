import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationConfig } from '../models/pagination-config.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  Save(body: any) {
    return this.http.post('Booking/Save', body);
  }

  Complete(id: number) {
    return this.http.get('Booking/Complete?id=' + id);
  }

  GetAll(model: PaginationConfig) {
    return this.http.get(`Booking/GetAll?page=${model.page}&size=${model.size}&search=${model.search}`)
  }
}
