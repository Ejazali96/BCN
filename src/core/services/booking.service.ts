import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
