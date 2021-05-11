import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { configHelper } from '../../configurations/configHelper';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {
  url: string;

  constructor(private http: HttpService, private http2: HttpClient) {
    this.url = `${configHelper.URL3}/clientes`
  }

  getOnesignal(id): Observable<any> {
    return this.http.get(`${this.url}/get-onesignal/${id}`);
  }



  postOnesignalUser(data, mensagem, title?): Observable<any> {


    let header = new HttpHeaders();

    header = header.append('Authorization', 'Basic MjFlMTYxNzMtODIxNi00MzZlLTg2ZDgtODVkMDZiNGQwYTg3');
    header = header.append('Content-type', 'application/json');

    let object = {
      app_id: "73405c34-3905-4eb0-afc6-286c35cf5b9c",
      include_player_ids: data,
      data: { "foo": "bar" },
      headings: { "en": title },
      contents: { "en": mensagem }
    }

    return this.http2.post(configHelper.onesignalUrl, object, { headers: header });
  }

}
