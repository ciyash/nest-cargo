import { HeaderComponent } from '../header/header.component';
import { CompanyLogoComponent } from '../../shared/company-logo/company-logo.component';
import { BillingComponent } from '../../shared/billing/billing.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/service/token.service';
@Component({standalone: true, selector: 'app-company-workspace', imports: [HeaderComponent, CompanyLogoComponent, BillingComponent, CommonModule, ReactiveFormsModule, RouterModule], templateUrl: './company-workspace.component.html'})
export class CompanyWorkspaceComponent implements OnInit {
  staff: any[] = []; branches: any[] = []; loading = false; saving = false; branchSaving = false;
  error = ''; message = ''; listError = ''; branchError = '';
  companyId = this.token.getUser()?.company?._id || '';
  logoText = ''; savedLogoText = ''; brandingSaving = false; brandingError = '';
  companyName = this.token.getUser()?.company?.name || 'Your company';
  form = this.fb.group({name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(8)]], role: ['admin', Validators.required], branchId: [''], username: [''], phone: ['']});
  branchForm = this.fb.group({name: ['', Validators.required], branchType: ['main', Validators.required], city: ['', Validators.required], location: ['', Validators.required], address: ['', Validators.required], phone: ['', Validators.required], pincode: ['', Validators.required], state: ['', Validators.required], country: ['India', Validators.required]});
  constructor(private fb: FormBuilder, private http: HttpClient, public token: TokenService) {}
  private base = environment.baseUrl.replace(/\/+$/, '');
  private options() { return {headers: new HttpHeaders({Authorization: 'Bearer ' + this.token.getToken()})}; }
  ngOnInit() { this.loadStaff(); this.loadBranches(); this.loadBranding(); }
  loadBranding() {
    if (!this.companyId) return;
    this.http.get<any>(this.base + '/company/branding').subscribe({next: result => {this.logoText = result.logoText || result.name; this.savedLogoText = this.logoText; this.companyName = result.name;},error: () => this.brandingError = 'Could not load company branding.'});
  }
  setLogoText(event: Event) { this.logoText = (event.target as HTMLInputElement).value; }
  saveLogoText() {
    if (this.brandingSaving) return;
    this.brandingError = '';
    if (this.logoText.trim() && !/^[a-z]{2}$/i.test(this.logoText.trim())) { this.brandingError = 'Enter exactly two letters, or leave blank for company initials.'; return; }
    this.brandingSaving = true;
    this.http.patch<any>(this.base + '/company/update',{logoText:this.logoText.trim()},this.options()).subscribe({next: result => {this.brandingSaving = false;this.token.saveUser({role:'company',company:result.company});this.savedLogoText = this.logoText.trim().toUpperCase();this.logoText = this.savedLogoText;this.message = 'Your company logo letters have been updated.';},error: err => {this.brandingSaving = false;this.brandingError = err.error?.message || 'Could not update logo text.';}});
  }
  loadStaff() {
    this.loading = true; this.listError = '';
    this.http.get<any[]>(this.base + '/subadmin-auth/subadmins', this.options()).subscribe({next: rows => { this.staff = rows; this.loading = false; }, error: err => { this.loading = false; if (err.status === 404) this.staff = []; else this.listError = 'Could not load staff. Please retry.'; }});
  }
  loadBranches() {
    this.branchError = '';
    this.http.get<any[]>(this.base + '/company/branches', this.options()).subscribe({next: rows => this.branches = rows, error: err => { if (err.status === 404) this.branches = []; else this.branchError = 'Could not load branches. Please retry.'; }});
  }
  createStaff() {
    if (this.saving) return;
    this.form.markAllAsTouched(); this.error = ''; this.message = '';
    if (this.form.invalid) { this.error = 'Enter name, valid email and a password of at least 8 characters.'; return; }
    const value = this.form.getRawValue();
    if (value.role === 'subadmin' && !value.branchId) { this.error = 'Select a branch for the subadmin. Create a branch below if needed.'; return; }
    this.saving = true;
    const payload = {...value, branchId: value.role === 'admin' ? null : value.branchId};
    this.http.post(this.base + '/subadmin-auth/signup-by-company', payload, this.options()).subscribe({next: () => {
      this.saving = false; this.message = 'Account created. Staff can now sign in using their email and password.';
      this.form.reset({role: 'admin', branchId: ''}); this.loadStaff();
    }, error: err => { this.saving = false; this.error = err.error?.message || 'Could not create account. Please try again.'; }});
  }
  createBranch() {
    if (this.branchSaving) return;
    this.branchForm.markAllAsTouched(); this.branchError = '';
    if (this.branchForm.invalid) { this.branchError = 'Complete all required branch fields.'; return; }
    this.branchSaving = true;
    this.http.post<any>(this.base + '/company/branches', this.branchForm.getRawValue(), this.options()).subscribe({next: res => {
      this.branchSaving = false; this.branchForm.reset({branchType: 'main', country: 'India'}); this.loadBranches(); this.form.patchValue({branchId: res.data._id}); this.message = 'Branch created. You can assign it to a subadmin.';
    }, error: err => { this.branchSaving = false; this.branchError = err.error?.message || 'Could not create branch.'; }});
  }
}