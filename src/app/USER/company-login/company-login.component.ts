import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
//
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss']
})
export class CompanyLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  submitting = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: AuthService,
    private router: Router,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('registered')) this.successMessage = 'Company registered. Sign in to create your admins and subadmins.';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  CompanyLogin(): void {
    if (this.submitting) return;
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }
    this.errorMessage = '';
    this.submitting = true;
    const payload = this.loginForm.value;

    this.api.Companylogin(payload).subscribe({
      next: (res: any) => {
        this.submitting = false;
        this.token.saveToken(res.token);
        this.token.saveUser({ role: 'company', company: res.company });
        this.token.setCompanyLoginFlag(); // ✅ Mark as company login (admin role)
        this.router.navigate(['/create-admin']);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
      }
    });



  }


}
