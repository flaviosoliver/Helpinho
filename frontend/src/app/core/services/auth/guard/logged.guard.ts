import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../auth.service';

export const loggedGuard = (
  route?: ActivatedRouteSnapshot,
  state?: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return !authService.isLoggedIn() ? true : router.parseUrl('');
};
