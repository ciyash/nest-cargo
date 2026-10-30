import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { TokenService } from 'src/app/service/token.service';

describe('Dashboard report aggregation', () => {
  let component: DashboardComponent;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    http = TestBed.inject(HttpTestingController);
    component = new DashboardComponent(TestBed.inject(HttpClient), {getToken: () => 'test'} as TokenService);
  });
  afterEach(() => { component.ngOnDestroy(); http.verify(); });

  it('combines every sales page and calculates totals from numeric values', () => {
    component.loadSales();
    const first = http.expectOne(req => req.url.endsWith('/sales-summary-branchwise') && req.params.get('page') === '1');
    first.flush({data: [{paid: '10', toPay: 5}], pagination: {page: 1, hasNextPage: true, nextPage: 2}});
    expect(component.salesLoading).toBeTrue();
    http.expectOne(req => req.params.get('page') === '2').flush({data: [{paid: 20, credit: 5}], pagination: {page: 2, hasNextPage: false}});
    expect(component.sales.length).toBe(2);
    expect(component.salesSum('paid')).toBe(30);
    expect(component.salesTotal).toBe(40);
    expect(component.share('paid')).toBe(75);
    expect(component.salesLoading).toBeFalse();
  });

  it('clears previous totals when a reload fails', () => {
    component.loadStatus();
    http.expectOne(req => req.url.endsWith('/status-wise-summary')).flush({branchwiseStatus: [{booking: '4', delivered: 2}]});
    expect(component.sum('booking')).toBe(4);
    component.loadStatus();
    http.expectOne(req => req.url.endsWith('/status-wise-summary')).flush('failure', {status: 500, statusText: 'Server error'});
    expect(component.sum('booking')).toBe(0);
    expect(component.statusError).toBeTruthy();
    expect(component.statusLoading).toBeFalse();
  });

  it('stops pagination when the server repeats the current page', () => {
    component.loadSales();
    http.expectOne(req => req.url.endsWith('/sales-summary-branchwise')).flush({data: [], pagination: {page: 1, hasNextPage: true, nextPage: 1}});
    expect(component.salesError).toBeTruthy();
    expect(component.salesLoading).toBeFalse();
  });

  it('cancels outstanding reports when the dashboard is destroyed', () => {
    component.loadSales();
    const request = http.expectOne(req => req.url.endsWith('/sales-summary-branchwise'));
    component.ngOnDestroy();
    expect(request.cancelled).toBeTrue();
  });
});
