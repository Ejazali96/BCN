import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookNowComponent } from './pages/book-now/book-now.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BookingDetailComponent } from './pages/book-now/booking-detail/booking-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'booking',
    children: [
      { path: '', component: BookNowComponent },
      { path: 'detail', component: BookingDetailComponent },
    ]
  },
  // { path: 'about-us', component: AboutUsComponent },
  // { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
