import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private companyLoginFlag = false;
  private user: any | null = null;
  private token: string | null = null;

  constructor(private router: Router) {
    this.getUser(); // Load user if stored (optional)
    this.token = localStorage.getItem(TOKEN_KEY);
  }

  // ✅ Token methods
  public saveToken(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
    this.token = token;

  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // ✅ Optional user storage (skip if not using)
  public saveUser(user: any): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.user = user;
  }

  public getUser(): any {
    try {
      this.user = JSON.parse(localStorage.getItem(USER_KEY) || 'null');
    } catch (error) {
      console.error('Invalid JSON format in localStorage:', error);
      this.user = null;
    }
    return this.user;
  }

  public getRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  public isLogged(): boolean {
    return !!this.getToken(); // Only checks token now
  }

  // ✅ In-memory company login flag
  public setCompanyLoginFlag(): void {
    this.companyLoginFlag = true;
  }

  public isCompany(): boolean {
    try {
      const payload = JSON.parse(atob((this.getToken() || '').split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return payload.role === 'company' && payload.exp * 1000 > Date.now();
    } catch { return false; }
  }

  // ✅ Role-based checks (if user is saved)
  public isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  public isSubAdmin(): boolean {
    return this.getRole() === 'subadmin';
  }

  public isEmployee(): boolean {
    return this.getRole() === 'employee';
  }

  public isAccountant(): boolean {
    return this.getRole() === 'accountant';
  }

  public isSuperviser(): boolean {
    return this.getRole() === 'superviser';
  }

  public isDriver(): boolean {
    return this.getRole() === 'driver';
  }

  // ✅ Logout
  public signOut(): void {
    const loginPath = this.isCompany() ? '/clogin' : '/login';
    this.user = null;
    this.token = null;
    this.companyLoginFlag = false;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    this.router.navigate([loginPath]);
  }
}
