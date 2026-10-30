import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = (route) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (!tokenService.isLogged()) return router.createUrlTree(['/login']);
  const roles = route.data['roles'] as string[] | undefined;
  const role = tokenService.getRole();
  return !roles || (role !== null && roles.includes(role))
    ? true
    : router.createUrlTree(['/login']);
};
