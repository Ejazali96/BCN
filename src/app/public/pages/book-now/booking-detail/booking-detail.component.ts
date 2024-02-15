import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { BookingService } from 'src/core/services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StripeService } from 'src/core/services/stripe.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent {

  booking: any
  constructor(
    private dialogService: DialogService,
    private bookingService: BookingService,
    private stripeService: StripeService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.booking = JSON.parse(localStorage['booking'])
  }

  ConfirmBooking() {
    this.dialogService.open(
      ConfirmBookingComponent,
      {
        header: 'Confirm Booking',
        width: '30vw',
        height: '50vh',
        modal: true,
      }
    ).onClose.subscribe((res: any) => {
      if (res) {
        this.booking.email = res.email
        this.booking.name = res.name
        this.booking.contactNumber = res.contactNumber
        this.booking.locations = []
        this.booking.locations.push(this.booking.pickup)
        this.booking.locations.push(this.booking.dropOff)

        // localStorage['booking']
        var body = {
          url: location.origin,
          booking: this.booking
        }
        this.stripeService.CreateCheckoutSession(body).subscribe((res: any) => {
          if (res.isSuccess) {
            location.replace(res.payload.url)
          }
        })
      }
    })
  }
}
