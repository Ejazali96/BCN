import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { CaptainsComponent } from './pages/captains/captains.component';
import { SaveVehiclesComponent } from './pages/vehicles/save-vehicles/save-vehicles.component';
import { DropdownModule } from 'primeng/dropdown';
import { BookingDetailModelComponent } from './pages/bookings/booking-detail-model/booking-detail-model.component';
import { DialogService } from 'primeng/dynamicdialog';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [
    BookingsComponent,
    AdminLayoutComponent,
    VehiclesComponent,
    CaptainsComponent,
    SaveVehiclesComponent,
    BookingDetailModelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    GoogleMapsModule,
  ],
  providers: [
    DialogService
  ]
})
export class AdminModule { }
