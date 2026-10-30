import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';
import { inject } from '@angular/core';

export const cauthGuardGuard: CanActivateFn = () => {
  return inject(TokenService).isLogged()
    ? true
    : inject(Router).createUrlTree(['/clogin']);
};
