import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { BookNowComponent } from './pages/book-now/book-now.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BookingDetailComponent } from './pages/book-now/booking-detail/booking-detail.component';
import { TermsConditionsComponent } from './shared/terms-conditions/terms-conditions.component';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    BookNowComponent,
    AboutUsComponent,
    ContactUsComponent,
    BookingDetailComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    AutoCompleteModule
  ]
})
export class PublicModule { }
