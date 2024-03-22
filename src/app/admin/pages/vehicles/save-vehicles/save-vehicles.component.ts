import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/core/services/booking.service';
import { FileService } from 'src/core/services/file.service';
import { VehicleService } from 'src/core/services/vehicle.service';

@Component({
  selector: 'app-save-vehicles',
  templateUrl: './save-vehicles.component.html',
  styleUrls: ['./save-vehicles.component.scss']
})
export class SaveVehiclesComponent {
  id: number = 0
  form!: FormGroup
  types: any[] = []
  transmissions: any[] = [
    'Manual',
    'Automatic'
  ]

  constructor(
    private service: VehicleService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fileService: FileService,
    private fb: FormBuilder
  ) {
    route.queryParams.subscribe((params) => {
      this.id = params['id']
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      seats: ['', [Validators.required]],
      bags: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      transmission: ['', [Validators.required]],
    })

    this.service.GetAllTypes().subscribe((res: any) => {
      this.types = res.payload
    })

    if (this.id) {
      this.Get()
    }
  }

  Get() {
    this.service.Get(this.id).subscribe((res: any) => {
      this.form = this.fb.group({
        id: [res.payload.id],
        name: [res.payload.name, [Validators.required]],
        image: [res.payload.image, [Validators.required]],
        seats: [res.payload.seats, [Validators.required]],
        bags: [res.payload.bags, [Validators.required]],
        typeId: [res.payload.typeId, [Validators.required]],
        transmission: [res.payload.transmission, [Validators.required]],
      })
      console.log(this.form.value)
    })
  }

  Upload(event: any) {
    if (event.target.files.length == 0) {
      return
    }
    var file = event.target.files[0]
    var formData = new FormData()
    formData.append('file', file)

    this.fileService.Upload(formData).subscribe((res: any) => {
      if (res.isSuccess) {
        this.form.controls['image'].setValue(res.payload)
      }
    })
  }

  Submit() {
    if (this.form.invalid) {
      return
    }
    this.service.Save(this.form.value).subscribe((res: any) => {
      if (res.isSuccess) {
        this.toastr.success('Vehicle Saved')
        this.router.navigate(['/admin/vehicles'])
      }
    })
  }
}
