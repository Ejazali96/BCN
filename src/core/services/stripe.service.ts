import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  CreateCheckoutSession(body: any) {
    return this.http.post('Stripe/CreateCheckoutSession', body);
  }
}
