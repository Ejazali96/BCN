import { Component } from '@angular/core';
interface info {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  image?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  testimonial: info[] = [];
  responsiveOptions:
    | { breakpoint: string; numVisible: number; numScroll: number }[]
    | undefined;
  constructor() {}
  ngOnInit() {
    this.testimonial = [
      {
        id: '1',
        name: 'JOHN DOE',
        description:
          'I recently had the pleasure of using Terminal Transit, and I must say, it exceeded my expectations in every way. As someone who frequently requires local and out-of-city car rentals, I have encountered my fair share of booking platforms, but this one stands out for several reasons.',
        price: '15 / 5 / 2023',
        image: '',
      },
      {
        id: '2',
        name: 'JOHN DOE',
        description:
          'I recently had the pleasure of using Terminal Transit, and I must say, it exceeded my expectations in every way. As someone who frequently requires local and out-of-city car rentals, I have encountered my fair share of booking platforms, but this one stands out for several reasons.',
        price: '15 / 5 / 2023',
        image: '',
      },
      {
        id: '3',
        name: 'JOHN DOE',
        description:
          'I recently had the pleasure of using Terminal Transit, and I must say, it exceeded my expectations in every way. As someone who frequently requires local and out-of-city car rentals, I have encountered my fair share of booking platforms, but this one stands out for several reasons.',
        price: '15 / 5 / 2023',
        image: '',
      },
      {
        id: '4',
        name: 'JOHN DOE',
        description:
          'I recently had the pleasure of using Terminal Transit, and I must say, it exceeded my expectations in every way. As someone who frequently requires local and out-of-city car rentals, I have encountered my fair share of booking platforms, but this one stands out for several reasons.',
        price: '15 / 5 / 2023',
        image: '',
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
