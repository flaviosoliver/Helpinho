import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Auth } from './interface/auth.interface';
import { Login } from './interface/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.apiUrl}/auth`;
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private readonly storageService: LocalStorageService
  ) {}

  isLoggedIn(): boolean {
    const token = this.storageService.get('token');
    if (token != null && token != '') {
      return true;
    }
    return false;
  }

  isTokenExpired(token: string | null): boolean {
    if (token != null && token != '') {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp === undefined) {
        return false;
      }

      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);

      return expirationDate.valueOf() < new Date().valueOf();
    }
    return true;
  }

  login(data: Login): Observable<Auth> {
    data.email = data.email.trim().toLowerCase();
    return this.http.post<Auth>(`${this.url}/login`, data).pipe(
      map((res: Auth) => {
        this.storageService.setUserData(res);
        this.isLogged$.next(true);
        return res;
      })
    );
  }

  public logout() {
    this.storageService.clear();
  }
}
