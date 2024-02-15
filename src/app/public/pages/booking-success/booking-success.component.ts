import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/core/services/booking.service';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.scss']
})
export class BookingSuccessComponent {

  bookingId: number = 0
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private toastr: ToastrService,

  ) {
    route.queryParams.subscribe((params) => {
      this.bookingId = params['bookingId']
    })
  }

  ngOnInit() {
    this.bookingService.Complete(this.bookingId).subscribe((res: any) => {
      this.toastr.success('Booking Successful')
    })
    this.router.navigate(['/'])
  }
}
