import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  FormSubmit() {
    this.auth.Login(this.form.value).subscribe((res: any) => {
      if (res.isSuccess) {
        localStorage['token'] = res.payload.token.tokenString
        localStorage['currentUser'] = JSON.stringify(res.payload)
        this.router.navigate(['admin'])
      }
    })
  }
}
