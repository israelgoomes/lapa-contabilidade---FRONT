import { configHelper } from './../../configurations/configHelper';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  url;
  constructor(private http: HttpService) {
    this.url = `${configHelper.URL3}/solicitacoes`
  }


  listaSolicitacoes(idUser): Observable<any> {
    let object = {
      idUser: idUser
    }
    return this.http.post(this.url, object)
  }

  listarRespostas(idSolicitacao, cdSolicitacao): Observable<any> {
    let object = {
      idSolicitacao: idSolicitacao,
      cdSolicitacao: cdSolicitacao
    }
    return this.http.post(`${this.url}/get-response`, object)
  }

  responder(data): Observable<any> {
    return this.http.post(`${this.url}/create-response`, data)
  }

  criarSolicitacao(data): Observable<any> {
    return this.http.post(`${this.url}/create`, data)
  }

  deletarResposta(idResSolicitacao, idDocSolicitacao, path): Observable<any> {

    let id = {
      idResSolicitacao: idResSolicitacao,
      idDocSolicitacao: idDocSolicitacao,
      path: path
    }
    return this.http.post(`${this.url}/delete-response`, id);

  }


  finalizaSolicitacao(idSolicitacao): Observable<any> {
    let id = {
      idSolicitacao: idSolicitacao
    }
    return this.http.post(`${this.url}/ends-request`, id);
  }
}
