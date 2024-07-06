import { Injectable } from '@angular/core';
import { Auth } from '../auth/interface/auth.interface';
import { UserDto } from '../users/dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get(key: string) {
    return localStorage.getItem(key);
  }

  getUserData(): UserDto | undefined {
    if (localStorage['userData']) {
      return JSON.parse(localStorage['userData']);
    }
    return undefined;
  }

  set(key: string, value: any): boolean {
    localStorage.setItem(key, JSON.stringify(value));

    return true;
  }

  setUserData(data: Auth) {
    this.set('token', data.token);
    this.set('userId', data.user.id);
    this.set('email', data.user.email);
    this.set('userData', data.user);
  }

  has(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
