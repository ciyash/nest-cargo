import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDashboardBookingComponent } from './sub-dashboard-booking.component';

describe('SubDashboardBookingComponent', () => {
  let component: SubDashboardBookingComponent;
  let fixture: ComponentFixture<SubDashboardBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubDashboardBookingComponent]
    });
    fixture = TestBed.createComponent(SubDashboardBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
