import { CompanyLogoComponent } from '../../shared/company-logo/company-logo.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({standalone: true, selector: 'app-signup', imports: [CompanyLogoComponent, CommonModule, ReactiveFormsModule, RouterModule], templateUrl: './signup.component.html', styleUrls: ['./signup.component.scss']})
export class SignupComponent {
  submitting = false;
  errorMessage = '';
  form = this.fb.group({ logoText: ['', Validators.pattern(/^[a-zA-Z]{2}$/)], name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(8)]], confirmPassword: ['', Validators.required], phone: [''], address: [''], state: [''], customerName: [''] });
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}
  register() {
    if (this.submitting) return;
    this.form.markAllAsTouched();
    if (this.form.invalid) { this.errorMessage = 'Enter company name, valid email and a password of at least 8 characters.'; return; }
    const { confirmPassword, ...payload } = this.form.getRawValue();
    if (payload.password !== confirmPassword) { this.errorMessage = 'Passwords must match.'; return; }
    if (!payload.name?.trim()) { this.errorMessage = 'Enter company name.'; return; }
    this.submitting = true; this.errorMessage = '';

    this.http.post<any>(environment.baseUrl.replace(/\/+$/, '') + '/company/register', payload).subscribe({
      next: result => { this.submitting = false; this.router.navigate(['/clogin'], {queryParams: {registered: 1}}); },
      error: err => { this.submitting = false; this.errorMessage = err.error?.message || err.error?.msg || 'Registration failed. Please try again.'; }
    });
  }
}