import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';
export const companyGuard: CanActivateFn = () => inject(TokenService).isCompany() || inject(Router).createUrlTree(['/clogin']);
