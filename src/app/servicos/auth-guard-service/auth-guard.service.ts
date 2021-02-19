import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { configHelper } from '../../configurations/configHelper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!localStorage.getItem(configHelper.storageKeys.tokenAdmin)) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
