import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EMPTY, Observable, Subscription, expand, reduce } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from '../header/header.component';
@Component({standalone:true, selector:'app-dashboard', imports:[CommonModule,FormsModule,RouterModule,HeaderComponent], templateUrl:'./dashboard.component.html', styleUrls:['./dashboard.component.scss']})
export class DashboardComponent implements OnInit, OnDestroy {
  today = this.localDate(new Date()); date = this.today;
  sales: any[] = []; statuses: any[] = []; accounts: any[] = [];
  salesLoading = true; statusLoading = true; accountLoading = true;
  salesError = ''; statusError = ''; accountError = ''; dateError = '';
  accountType = 'party'; totalAmount = 0;
  readonly salesTypes = [
    {key:'paid',label:'Paid',color:'#2563eb'},
    {key:'toPay',label:'To pay',color:'#d98b19'},
    {key:'credit',label:'Credit',color:'#805ad5'},
    {key:'FOC',label:'Free of cost',color:'#159875'},
  ];
  private salesTotals: Record<string, number> = {};
  private statusTotals: Record<string, number> = {};
  salesTotal = 0;
  private totals(rows: any[], keys: string[]): Record<string, number> {
    const totals: Record<string, number> = {};
    for (const key of keys) totals[key] = 0;
    for (const row of rows) for (const key of keys) totals[key] += this.n(row[key]);
    return totals;
  }
  private salesRequest?: Subscription; private statusRequest?: Subscription; private accountRequest?: Subscription;
  constructor(private http: HttpClient, private token: TokenService) {}
  private report(endpoint: string, key: string, date?: string): Observable<any> {
    const fetchPage = (page: number): Observable<any> => {
      const url = environment.baseUrl.replace(/\/+$/, '') + '/booking/' + endpoint;
      const options = {headers: new HttpHeaders({Authorization:'Bearer ' + this.token.getToken()}), params: {page:String(page),limit:'100'}};
      return date ? this.http.post(url,{date},options) : this.http.get(url,options);
    };
    return fetchPage(1).pipe(
      expand(res => {
        const pagination = res.pagination;
        if (!pagination?.hasNextPage) return EMPTY;
        if (!Number.isInteger(pagination.nextPage) || pagination.nextPage <= pagination.page) {
          throw new Error('Report pagination did not advance');
        }
        return fetchPage(pagination.nextPage);
      }),
      reduce((all: any, res: any) => {
        const rows = Array.isArray(res) ? res : res[key] || res.data?.[key] || [];
        for (const row of rows) all[key].push(row);
        return {...res, [key]: all[key]};
      }, {[key]: []}),
    );
  }

  private localDate(d: Date) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
  ngOnInit() { this.refresh(); }
  ngOnDestroy() { this.salesRequest?.unsubscribe(); this.statusRequest?.unsubscribe(); this.accountRequest?.unsubscribe(); }
  n(value: any): number { const n = Number(value); return Number.isFinite(n) ? n : 0; }
  sum(key: string): number { return this.statusTotals[key] || 0; }
  salesSum(key: string): number { return this.salesTotals[key] || 0; }
  share(key: string) { return this.salesTotal ? this.salesSum(key)/this.salesTotal*100 : 0; }
  refresh() { this.loadDate(); this.loadStatus(); }
  loadDate() {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(this.date) || this.date > this.today) { this.dateError = 'Choose a valid date up to today.'; return; }
    this.dateError = ''; this.loadSales(); this.loadAccounts();
  }
  private payload() { return {date:this.date.split('-').reverse().join('-')}; }
  loadSales() {
    this.salesRequest?.unsubscribe(); this.salesLoading = true; this.salesError = ''; this.sales = []; this.salesTotals = {}; this.salesTotal = 0;
    this.salesRequest = this.report('sales-summary-branchwise','data',this.payload().date).subscribe({next:(res:any) => { this.sales = Array.isArray(res) ? res : res.data || []; this.salesTotals = this.totals(this.sales, this.salesTypes.map(type => type.key)); this.salesTotal = Object.values(this.salesTotals).reduce((total, value) => total + value, 0); this.salesLoading = false; },error:err => {this.salesLoading = false; if(err.status !== 404) this.salesError = 'Sales summary could not be loaded.';}});
  }
  loadStatus() {
    this.statusRequest?.unsubscribe(); this.statusLoading = true; this.statusError = ''; this.statuses = []; this.statusTotals = {};
    this.statusRequest = this.report('status-wise-summary','branchwiseStatus').subscribe({next:(res:any) => {this.statuses = res.branchwiseStatus || res.data?.branchwiseStatus || []; this.statusTotals = this.totals(this.statuses, ['booking','loading','unloading','delivered']); this.statusLoading = false;},error:err => {this.statusLoading = false; if(err.status !== 404) this.statusError = 'Shipment status could not be loaded.';}});
  }
  loadAccounts() {
    this.accountRequest?.unsubscribe(); this.accountLoading = true; this.accountError = ''; this.accounts = []; this.totalAmount = 0;
    const request = this.accountType === 'party' ? this.report('acparty-account','parties',this.payload().date) : this.report('branch-account','branchwise',this.payload().date);
    this.accountRequest = request.subscribe({next:(res:any) => {this.accounts = res.parties || res.branchwise || res.data?.branchwise || []; this.totalAmount = this.n(res.totalAmount ?? res.data?.totalAmount); this.accountLoading = false;},error:err => {this.accountLoading = false; if(err.status !== 404) this.accountError = 'Account summary could not be loaded.';}});
  }
}