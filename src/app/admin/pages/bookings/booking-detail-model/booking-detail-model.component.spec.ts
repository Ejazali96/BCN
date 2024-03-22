import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailModelComponent } from './booking-detail-model.component';

describe('BookingDetailModelComponent', () => {
  let component: BookingDetailModelComponent;
  let fixture: ComponentFixture<BookingDetailModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingDetailModelComponent]
    });
    fixture = TestBed.createComponent(BookingDetailModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
