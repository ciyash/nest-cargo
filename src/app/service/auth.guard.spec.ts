import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from './token.service';
import { authGuard } from './auth.guard';
import { cauthGuardGuard } from './cauth-guard.guard';

describe('Route access', () => {
  let token: jasmine.SpyObj<TokenService>;
  let router: Router;
  beforeEach(() => {
    token = jasmine.createSpyObj('TokenService', ['isLogged', 'getRole']);
    TestBed.configureTestingModule({ imports: [RouterTestingModule], providers: [{ provide: TokenService, useValue: token }] });
    router = TestBed.inject(Router);
  });
  function check(roles?: string[]) {
    const route = { data: roles ? { roles } : {} } as ActivatedRouteSnapshot;
    return TestBed.runInInjectionContext(() => authGuard(route, {} as RouterStateSnapshot));
  }
  it('redirects unauthenticated users to login', () => {
    token.isLogged.and.returnValue(false);
    expect(router.serializeUrl(check() as UrlTree)).toBe('/login');
  });
  it('allows authenticated users on shared screens', () => {
    token.isLogged.and.returnValue(true);
    expect(check()).toBeTrue();
  });
  it('allows the configured role', () => {
    token.isLogged.and.returnValue(true);
    token.getRole.and.returnValue('employee');
    expect(check(['employee'])).toBeTrue();
  });
  it('rejects a different or missing role', () => {
    token.isLogged.and.returnValue(true);
    token.getRole.and.returnValue('employee');
    expect(router.serializeUrl(check(['admin']) as UrlTree)).toBe('/login');
    token.getRole.and.returnValue(null);
    expect(router.serializeUrl(check(['admin']) as UrlTree)).toBe('/login');
  });
  it('redirects company login without looping to createbranch', () => {
    token.isLogged.and.returnValue(false);
    const result = TestBed.runInInjectionContext(() => cauthGuardGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
    expect(router.serializeUrl(result as UrlTree)).toBe('/clogin');
  });
});
