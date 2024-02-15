import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent {

  form!: FormGroup

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
    })
  }

  Submit() {
    if (this.form.invalid) {
      return
    }
    this.dialogRef.close(this.form.value)
  }
}
