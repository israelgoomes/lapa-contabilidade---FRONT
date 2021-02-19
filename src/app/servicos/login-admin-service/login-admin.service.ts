import { configHelper } from '../../configurations/configHelper';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  url: string;
  constructor(private http: HttpService) {
    this.url = `${configHelper.URL3}/admin/autentica`

  }

  authenticate(cpf, senha): Observable<any> {
    return this.http.post(this.url, { cpf, senha });
  }

  registerToken(result) {
    localStorage.setItem(configHelper.storageKeys.token, result);
    localStorage.setItem(configHelper.storageKeys.tokenAdmin, result);
  }

  registerUser(data) {
    localStorage.setItem(configHelper.storageKeys.userAdmin, JSON.stringify(data));
  }

  getUser() {
    return JSON.parse(localStorage.getItem(configHelper.storageKeys.userAdmin));
  }

  getToken() {
    if (localStorage.getItem(configHelper.storageKeys.tokenAdmin)) {
      return true
    } else {
      return false
    }
  }

  logout() {
    localStorage.removeItem(configHelper.storageKeys.userAdmin);
    localStorage.removeItem(configHelper.storageKeys.tokenAdmin);
    localStorage.removeItem(configHelper.storageKeys.token)
  }
}
