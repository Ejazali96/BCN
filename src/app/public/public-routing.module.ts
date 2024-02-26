import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookNowComponent } from './pages/book-now/book-now.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BookingDetailComponent } from './pages/book-now/booking-detail/booking-detail.component';
import { BookingSuccessComponent } from './pages/booking-success/booking-success.component';
import { TermsConditionsComponent } from './shared/terms-conditions/terms-conditions.component';
import { PrivacyComponent } from './shared/privacy/privacy.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'booking',
    children: [
      { path: '', component: BookNowComponent },
      { path: 'detail', component: BookingDetailComponent },
    ],
  },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'booking-success', component: BookingSuccessComponent },
  { path: 'term-condition', component: TermsConditionsComponent },
  { path: 'privacy', component: PrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
