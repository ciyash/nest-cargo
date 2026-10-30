import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaybookingComponent } from './todaybooking.component';

describe('TodaybookingComponent', () => {
  let component: TodaybookingComponent;
  let fixture: ComponentFixture<TodaybookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodaybookingComponent]
    });
    fixture = TestBed.createComponent(TodaybookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
