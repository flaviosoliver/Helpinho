import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../local-storage/local-storage.service';

export const authGuard = (
  route?: ActivatedRouteSnapshot,
  state?: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const storageService = inject(LocalStorageService);
  const router = inject(Router);

  const token = storageService.get('token');

  return authService.isLoggedIn() && !authService.isTokenExpired(token)
    ? true
    : router.parseUrl('/login');
};
