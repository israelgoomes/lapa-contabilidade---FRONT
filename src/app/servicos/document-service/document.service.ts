import { configHelper } from './../../configurations/configHelper';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url: string;
  constructor(private http: HttpService) {
    this.url = `${configHelper.URL3}/documentos`
  }


  listarDocumentos(idUser): Observable<any> {
    return this.http.post(`${this.url}/listar-documentos`, idUser);
  }
}
