import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptainsComponent } from './captains.component';

describe('CaptainsComponent', () => {
  let component: CaptainsComponent;
  let fixture: ComponentFixture<CaptainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaptainsComponent]
    });
    fixture = TestBed.createComponent(CaptainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
