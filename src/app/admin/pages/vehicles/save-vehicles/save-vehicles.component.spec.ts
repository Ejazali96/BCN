import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveVehiclesComponent } from './save-vehicles.component';

describe('SaveVehiclesComponent', () => {
  let component: SaveVehiclesComponent;
  let fixture: ComponentFixture<SaveVehiclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveVehiclesComponent]
    });
    fixture = TestBed.createComponent(SaveVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
