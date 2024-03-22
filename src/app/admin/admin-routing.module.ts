import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { SaveVehiclesComponent } from './pages/vehicles/save-vehicles/save-vehicles.component';

const routes: Routes = [
  { path: '', redirectTo: 'bookings', pathMatch: 'full' },
  { path: 'bookings', component: BookingsComponent },
  {
    path: 'vehicles',
    children: [
      { path: '', component: VehiclesComponent },
      { path: 'save', component: SaveVehiclesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
