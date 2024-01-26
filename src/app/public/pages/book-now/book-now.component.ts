import { Component } from '@angular/core';
import { PaginationConfig } from 'src/core/models/pagination-config.model';
import { GoogleService } from 'src/core/services/google.service';
import { VehicleService } from 'src/core/services/vehicle.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss']
})
export class BookNowComponent {

  vehicleConfig: PaginationConfig = new PaginationConfig()
  vehicles: any[] = []

  suggestions: any = {
    pickUp: [],
    dropOff: []
  }

  constructor(
    private vehicleService: VehicleService,
    private googleService: GoogleService
  ) {

  }

  ngOnInit() {
    this.GetVehicles()
  }

  GetVehicles() {
    this.vehicleService.GetAll(this.vehicleConfig).subscribe((res: any) => {
      this.vehicles = res.payload
    })
  }

  AutoComplete(event: any, type: string) {
    this.googleService.AutoComplete(event.query).subscribe((res: any) => {
      this.suggestions[type] = res.predictions
      console.log(this.suggestions)
    })
  }

  GetPlaceById(event: any) {
    this.googleService.GetPlaceById(event.place_id).subscribe((res: any) => {
      let business = (this.form.controls['business'] as FormGroup)
      business.controls['name'].setValue(res.result.name)
      business.controls['address'].setValue(res.result.formatted_address)
      business.controls['placeId'].setValue(res.result.place_id)
      business.controls['latitude'].setValue(res.result.geometry.location.lat.toString())
      business.controls['longitude'].setValue(res.result.geometry.location.lng.toString())
    })
  }
}
