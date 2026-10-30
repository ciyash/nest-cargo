import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocherDetailsReportComponent } from './vocher-details-report.component';

describe('VocherDetailsReportComponent', () => {
  let component: VocherDetailsReportComponent;
  let fixture: ComponentFixture<VocherDetailsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VocherDetailsReportComponent]
    });
    fixture = TestBed.createComponent(VocherDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
