import { configHelper } from './../../configurations/configHelper';
import { Injectable } from '@angular/core';
import { Observable, config } from 'rxjs';
import { HttpService } from '../http-service/http.service';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginClientService {
  url: string;
  constructor(private http: HttpService) {
    this.url = `${configHelper.URL3}/autenticar`;
  }


  clientAuthenticate(login, senha): Observable<any> {

    let newObject = {
      cpfCnpj: login,
      senha: senha
    }
    return this.http.post(this.url, newObject);
  }

  registerToken(result) {
    localStorage.setItem(configHelper.storageKeys.token, result);
  }

  registerUser(data) {
    localStorage.setItem(configHelper.storageKeys.user, JSON.stringify(data));
  }

  getUser() {
    return JSON.parse(localStorage.getItem(configHelper.storageKeys.user));
  }

  getToken() {
    if (localStorage.getItem(configHelper.storageKeys.token)) {
      return true
    } else {
      return false
    }
  }

  logout() {
    localStorage.removeItem(configHelper.storageKeys.user);
    localStorage.removeItem(configHelper.storageKeys.token);

  }

}
