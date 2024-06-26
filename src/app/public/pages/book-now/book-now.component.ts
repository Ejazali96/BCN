import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaginationConfig } from 'src/core/models/pagination-config.model';
import { CityService } from 'src/core/services/city.service';
import { GoogleService } from 'src/core/services/google.service';
import { VehicleService } from 'src/core/services/vehicle.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss'],
})
export class BookNowComponent {
  vehicleConfig: PaginationConfig = new PaginationConfig();
  vehicles: any[] = [];
  vehicleTypes: any[] = [];
  cities: any[] = [];

  suggestions: any = {
    pickup: [],
    dropOff: [],
  };

  form!: FormGroup;

  constructor(
    private vehicleService: VehicleService,
    private cityService: CityService,
    private googleService: GoogleService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [0],
      name: [''],
      contactNumber: [''],
      email: [''],
      start: ['', [Validators.required]],
      end: [''],
      vehicleTypeId: ['', [Validators.required]],
      vehicleType: [''],
      isDropOff: ['true'],
      price: [0.0],
      distance: [''],
      duration: [''],
      isReturn: [false],
      pickup: this.fb.group({
        autocomplete: [''],
        placeId: [''],
        address: [''],
        placeName: ['', [Validators.required]],
        lat: [''],
        lng: [''],
        type: ['Pickup'],
        locality: [''],
        city: [''],
      }),
      dropOff: this.fb.group({
        autocomplete: [''],
        placeId: [''],
        address: [''],
        placeName: ['', [Validators.required]],
        lat: [''],
        lng: [''],
        type: ['DropOff'],
        locality: [''],
        city: [''],
      }),
    });

    this.vehicleService.GetAll(this.vehicleConfig).subscribe((res: any) => {
      this.vehicles = res.payload;
    });

    this.vehicleService.GetAllTypes().subscribe((res: any) => {
      this.vehicleTypes = res.payload;
    });

    this.cityService.GetAll().subscribe((res: any) => {
      this.cities = res.payload;
    });

    console.log(this.form.value);
  }

  AutoComplete(event: any, type: string) {
    this.googleService.AutoComplete(event.query).subscribe((res: any) => {
      this.suggestions[type] = res.predictions;
    });
  }
  GetPlaceById(event: any, type: string) {
    this.googleService.GetPlaceById(event.place_id).subscribe((res: any) => {
      let group = this.form.controls[type] as FormGroup;
      group.controls['placeName'].setValue(res.result.name);
      group.controls['address'].setValue(res.result.formatted_address);
      group.controls['placeId'].setValue(res.result.place_id);
      group.controls['lat'].setValue(
        res.result.geometry.location.lat.toString()
      );
      group.controls['lng'].setValue(
        res.result.geometry.location.lng.toString()
      );
      group.controls['locality'].setValue(
        res.result.address_components.find((x: any) =>
          x.types.includes('locality')
        )?.long_name
      );
      group.controls['city'].setValue(
        res.result.address_components.find((x: any) =>
          x.types.includes('administrative_area_level_2')
        )?.long_name
      );
      console.log(this.form.value);
    });
  }
  CalculatePrice() {
    var price = 0;

    var city = this.cities.find(
      (x: any) => x.name == this.form.value.pickup.city
    );
    if (!city) {
      this.toastr.error('Location out of range');
      return;
    }
    var pickupPlace = city.places.find(
      (x: any) => x.name == this.form.value.pickup.locality
    );

    var vehicleType = this.vehicleTypes.find(
      (x: any) => x.id == this.form.value.vehicleTypeId
    );
    this.form.controls['vehicleType'].setValue(vehicleType);

    if (this.form.controls['isDropOff'].value == 'true') {
      city = this.cities.find(
        (x: any) => x.name == this.form.value.dropOff.city
      );
      if (!city) {
        this.toastr.error('Location out of range');
        return;
      }
      var dropOffPlace = city.places.find(
        (x: any) => x.name == this.form.value.dropOff.locality
      );

      var pickup =
        this.form.value.pickup.lat + '%2C' + this.form.value.pickup.lng;
      var dropOff =
        this.form.value.dropOff.lat + '%2C' + this.form.value.dropOff.lng;
      this.googleService
        .CalculateDistance(pickup, dropOff)
        ?.subscribe((res: any) => {
          var distance = res.rows[0].elements[0].distance;
          var duration = res.rows[0].elements[0].duration;

          if (pickupPlace && dropOffPlace) {
            var pickupPrice = pickupPlace.prices.find(
              (x: any) => x.vehicleTypeId == this.form.value.vehicleTypeId
            )?.price;
            var dropOffPrice = dropOffPlace.prices.find(
              (x: any) => x.vehicleTypeId == this.form.value.vehicleTypeId
            )?.price;
            price = pickupPrice ? pickupPrice : dropOffPrice;
          } else {
            price = vehicleType.perKm * (distance.value / 1000);
          }

          this.form.controls['distance'].setValue(distance);
          this.form.controls['duration'].setValue(duration);
          this.form.controls['price'].setValue(price);

          this.form.value.end = this.form.value.start;
          this.form.value.isDropOff = true;

          localStorage['booking'] = JSON.stringify(this.form.value);
          this.router.navigate(['/booking/detail']);
        });
    } else {
      var hours =
        Math.abs(
          (new Date(this.form.value.start) as any) -
          (new Date(this.form.value.end) as any)
        ) / 36e5;
      price = vehicleType.perHourBarca * hours;

      this.form.controls['duration'].setValue({ text: hours * 60 + ' mins' });
      this.form.controls['price'].setValue(price);

      this.form.value.isDropOff = false;

      localStorage['booking'] = JSON.stringify(this.form.value);
      this.router.navigate(['/booking/detail']);
    }
  }

  Submit() {
    if (this.form.invalid) {
      return;
    }

    this.CalculatePrice();
  }

  IsDropOffChange(value: string) {
    this.form.controls['isDropOff'].setValue(value)
    if (this.form.controls['isDropOff'].value == 'true') {
      (this.form.controls['dropOff'] as FormGroup).controls[
        'placeName'
      ].setValidators([Validators.required]);
      this.form.controls['end'].setValidators([]);
    } else {
      (this.form.controls['dropOff'] as FormGroup).controls[
        'placeName'
      ].setValidators([]);
      this.form.controls['end'].setValidators([Validators.required]);
    }
    (this.form.controls['dropOff'] as FormGroup).controls[
      'placeName'
    ].updateValueAndValidity();
    this.form.controls['end'].updateValueAndValidity();
  }


}
