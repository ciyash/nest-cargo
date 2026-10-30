import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCfmasterDataComponent } from './get-cfmaster-data.component';

describe('GetCfmasterDataComponent', () => {
  let component: GetCfmasterDataComponent;
  let fixture: ComponentFixture<GetCfmasterDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GetCfmasterDataComponent]
    });
    fixture = TestBed.createComponent(GetCfmasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
