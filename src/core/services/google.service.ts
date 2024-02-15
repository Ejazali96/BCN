import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NO_LOADER } from '../interceptors/app.interceptor';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  AutoComplete(query: string) {
    return this.http.get('Google/AutoComplete?query=' + query, { context: new HttpContext().set(NO_LOADER, true) })
  }

  GetPlaceById(id: string) {
    return this.http.get('Google/GetPlaceById?id=' + id)
  }

  CalculateDistance(origin: string, destination: string) {
    return this.http.get(`Google/CalculateDistance?origin=${origin}&destination=${destination}`)
  }
}
