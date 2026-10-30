import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedstockReportComponent } from './receivedstock-report.component';

describe('ReceivedstockReportComponent', () => {
  let component: ReceivedstockReportComponent;
  let fixture: ComponentFixture<ReceivedstockReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReceivedstockReportComponent]
    });
    fixture = TestBed.createComponent(ReceivedstockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
