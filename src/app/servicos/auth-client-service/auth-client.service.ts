import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { configHelper } from '../../configurations/configHelper';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!localStorage.getItem(configHelper.storageKeys.token)) {
      return false
    }
    return true;
  }
}
