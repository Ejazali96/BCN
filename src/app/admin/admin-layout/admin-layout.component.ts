import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  path: string = ''
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
    role: ''
  }
  constructor(
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.path = location.pathname.replace('/admin/', '').replaceAll('-', ' ')
      }
    });
    this.user = JSON.parse(localStorage['currentUser'])
  }

  Logout() {
    localStorage.clear()
    this.router.navigate(['/auth'])
  }

}
