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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmBookingComponent } from './pages/book-now/booking-detail/confirm-booking/confirm-booking.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { BookingSuccessComponent } from './pages/booking-success/booking-success.component';
import { DialogModule } from 'primeng/dialog';
import { PrivacyComponent } from './shared/privacy/privacy.component';
@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    BookNowComponent,
    AboutUsComponent,
    ContactUsComponent,
    BookingDetailComponent,
    TermsConditionsComponent,
    ConfirmBookingComponent,
    BookingSuccessComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DynamicDialogModule,
    InputMaskModule,
    DialogModule,
  ],
  providers: [DialogService],
})
export class PublicModule {}
