import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { configHelper } from '../../configurations/configHelper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: string;

  updateAdminClient = new EventEmitter;

  constructor(private http: HttpService) {
    this.url = `${configHelper.URL3}/clientes`
  }


  listarClientes(): Observable<any> {
    return this.http.get(`${this.url}/listaClientes`);
  }

  updatePassword(data): Observable<any> {
    return this.http.post(`${this.url}/update-password`, data);
  }

  createClient(data): Observable<any> {
    return this.http.post(`${this.url}/cadastrar`, data)
  }

  updateClient(data): Observable<any> {
    return this.http.put(`${this.url}/atualizar`, data)
  }



}
