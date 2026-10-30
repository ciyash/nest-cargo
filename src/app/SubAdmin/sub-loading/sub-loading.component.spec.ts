import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLoadingComponent } from './sub-loading.component';

describe('SubLoadingComponent', () => {
  let component: SubLoadingComponent;
  let fixture: ComponentFixture<SubLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubLoadingComponent]
    });
    fixture = TestBed.createComponent(SubLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
