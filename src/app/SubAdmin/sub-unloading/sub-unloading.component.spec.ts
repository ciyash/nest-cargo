import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUnloadingComponent } from './sub-unloading.component';

describe('SubUnloadingComponent', () => {
  let component: SubUnloadingComponent;
  let fixture: ComponentFixture<SubUnloadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubUnloadingComponent]
    });
    fixture = TestBed.createComponent(SubUnloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
