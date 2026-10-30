import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/service/token.service';

declare global { interface Window { Razorpay: any; } }
@Component({
  standalone: true, selector: 'app-billing', imports: [CommonModule],
  template: `
  <section *ngIf="isCompany; else staffAllowance" class="billing-card" aria-label="Company booking plan">
    <div class="billing-heading"><div><span class="eyebrow">CARGONEST PLANS</span><h2>{{status?.paid ? 'Unlimited bookings' : '100 bookings, on us'}}</h2></div><button type="button" (click)="load()" [disabled]="busy || loading">Refresh plan</button></div>
    <p *ngIf="loading" role="status">Loading booking allowance...</p>
    <p *ngIf="error" role="alert" class="billing-error">{{error}}</p>
    <p *ngIf="message" role="status">{{message}}</p>
    <ng-container *ngIf="status">
      <p *ngIf="status.paid">Your unlimited plan is active until <strong>{{status.paidUntil | date:'medium'}}</strong>.</p>
      <ng-container *ngIf="!status.paid"><p><strong>{{status.freeBookingsRemaining}} / 100</strong> free bookings remaining for your entire company.</p><progress [value]="status.freeBookingsUsed" max="100" aria-label="Free bookings used"></progress><p *ngIf="!status.canBook && !status.blocked" class="billing-error">Free bookings completed. Upgrade to continue creating bookings. Existing bookings and reports stay available.</p></ng-container>
      <p *ngIf="status.blocked" class="billing-error">Your company is blocked. Contact platform support.</p>
      <div class="plan"><div><strong>INR 1,000 <small>/ month</small></strong><p>Unlimited bookings across all company branches  |  30 days per payment</p></div>
      <button type="button" *ngIf="isCompany" [disabled]="busy || status.blocked || !status.checkoutConfigured" (click)="pay()">{{busy ? 'Please wait...' : (status.paid ? 'Renew for INR 1,000' : 'Upgrade for INR 1,000')}}</button></div>
      <p *ngIf="!isCompany">Only your company owner can pay. Ask them to open Company workspace and upgrade the plan.</p>
      <p *ngIf="!status.checkoutConfigured" class="setup-note">Online payments are not available yet. Please contact platform support.</p>
      <p *ngIf="status.checkoutConfigured && status.testMode" class="setup-note">Razorpay test mode: payments are simulated; no real money is charged.</p>
      <small>100 free bookings once per company, shared by all staff. Cancelling a booking does not restore free allowance. Monthly access renews only when you pay; no automatic debit.</small>
    </ng-container>
    <div *ngIf="isCompany && history.length" class="payment-history"><h3>Recent payments</h3><div *ngFor="let payment of history" class="payment-row"><span>{{payment.createdAt | date:'mediumDate'}}  |  INR {{payment.amount / 100}}  |  {{payment.status === 'paid' ? 'Paid' : 'Not confirmed'}}</span><button type="button" *ngIf="payment.status !== 'paid'" [disabled]="busy" (click)="reconcile(payment.orderId)">Check payment</button></div></div>
  </section>
<ng-template #staffAllowance><div class="booking-access-warning" role="status" *ngIf="status && (status.blocked || !status.canBook || (!status.paid && status.freeBookingsRemaining <= 10))"><i class="pi pi-info-circle" aria-hidden="true"></i><span>{{status.blocked ? 'Company access is blocked. Contact your company owner.' : !status.canBook ? 'Free bookings completed. Ask your company owner to renew the booking plan.' : status.freeBookingsRemaining + ' free bookings remaining. Please inform your company owner.'}}</span><button type="button" (click)="load()" [disabled]="loading">Refresh</button></div></ng-template>`,
  styles: [`.booking-access-warning{display:flex;align-items:center;gap:12px;background:#fff8e9;border:1px solid #efdfbc;border-radius:9px;padding:11px 15px;margin-bottom:16px;font-size:12px;color:#7f642d}.booking-access-warning span{flex:1}.booking-access-warning button{background:transparent;color:inherit;border:1px solid #e1cfa5;padding:6px 10px;font-size:11px}.billing-card{padding:26px;background:#f2faf8;border:1px solid #cce5de;border-radius:16px;margin:0 0 26px;color:#153b50}.billing-heading,.plan,.payment-row{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}.eyebrow{font-size:11px;letter-spacing:2px;color:#18766b;font-weight:700}h2{font-size:24px;margin:10px 0}h3{font-size:16px}p{font-size:14px;line-height:1.6;margin:12px 0}progress{width:100%;height:12px;accent-color:#18766b}.plan{padding:18px 0;border-top:1px solid #cce5de;margin-top:18px}.plan strong{font-size:26px}.plan small,small{font-size:12px}button{border:0;border-radius:8px;padding:11px 18px;background:#176e67;color:#fff;cursor:pointer;font-size:13px}button:disabled{opacity:.5;cursor:default}.billing-error{color:#a33737}.setup-note{background:#fff1d6;border-radius:8px;padding:12px}.payment-history{border-top:1px solid #cce5de;margin-top:20px;padding-top:18px}.payment-row{padding:10px 0;font-size:13px}`]
})
export class BillingComponent implements OnInit {
  status: any; history: any[] = []; loading = false; busy = false; error = ''; message = '';
  isCompany = this.token.isCompany();
  private base = environment.baseUrl.replace(/\/+$/, '');
  constructor(private http: HttpClient, private token: TokenService, private zone: NgZone) {}
  private options() { return {headers: new HttpHeaders({Authorization: 'Bearer ' + this.token.getToken()})}; }
  private post(path: string, body: any) { return firstValueFrom(this.http.post<any>(this.base + '/billing/' + path,body,this.options())); }
  ngOnInit() { this.load(); }
  async load() {
    this.loading = true; this.error = '';
    try {
      this.status = await firstValueFrom(this.http.get<any>(this.base + '/billing/' + (this.isCompany ? 'status' : 'staff-status'),this.options()));
      if (this.isCompany) this.history = await firstValueFrom(this.http.get<any[]>(this.base + '/billing/history',this.options()));
    } catch (error: any) { this.error = error.error?.message || 'Could not load your plan. Please retry.'; }
    finally { this.loading = false; }
  }
  private checkoutScript(): Promise<void> {
    if (window.Razorpay) return Promise.resolve();
    return new Promise((resolve,reject) => {
      const script = document.createElement('script'); script.src = 'https://checkout.razorpay.com/v1/checkout.js'; script.onload = () => resolve(); script.onerror = () => { script.remove(); reject(new Error('Could not load Razorpay checkout. Please retry.')); }; document.head.appendChild(script);
    });
  }
  async pay() {
    if (this.busy || !this.isCompany) return;
    this.busy = true; this.error = ''; this.message = '';
    try {
      await this.checkoutScript();
      const order = await this.post('orders',{});
      const checkout = new window.Razorpay({key:order.keyId,order_id:order.orderId,amount:order.amount,currency:order.currency,name:'CargoNest',description:'Unlimited bookings  |  30 days',theme:{color:'#176e67'},
        handler:(result:any) => this.zone.run(() => this.confirm(result)),
        modal:{ondismiss:() => this.zone.run(() => { this.busy = false; this.message = 'Checkout closed. If charged, use Check payment below before paying again.'; this.load(); })}
      });
      checkout.on('payment.failed',() => this.zone.run(() => { this.error = 'Payment failed. You can retry checkout; your plan has not changed.'; this.busy = false; }));
      checkout.open();
    } catch(error:any) { this.error = error.error?.message || error.message || 'Could not start checkout.'; this.busy = false; }
  }
  private async confirm(result:any) {
    try { await this.post('verify',result); this.message = 'Payment verified. Unlimited bookings are now active!'; }
    catch(error:any) { this.error = error.error?.message || 'Payment confirmation pending. Use Check payment below; do not pay again.'; }
    finally { this.busy = false; const error = this.error; await this.load(); if(error) this.error = error; }
  }
  async reconcile(orderId:string) {
    this.busy = true; this.error = '';
    try { await this.post('reconcile',{orderId}); this.message = 'Payment confirmed. Your plan has been updated.'; await this.load(); }
    catch(error:any) { this.error = error.error?.message || 'Could not confirm payment. Please retry later.'; }
    finally { this.busy = false; }
  }
}
