import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelOnloadingComponent } from './parcel-onloading.component';

describe('ParcelOnloadingComponent', () => {
  let component: ParcelOnloadingComponent;
  let fixture: ComponentFixture<ParcelOnloadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ParcelOnloadingComponent]
    });
    fixture = TestBed.createComponent(ParcelOnloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
