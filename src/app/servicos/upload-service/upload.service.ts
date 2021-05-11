import { configHelper } from './../../configurations/configHelper';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';
import { HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url: string;
  constructor(private http: HttpService, private http2: HttpClient) {
    this.url = `${configHelper.URL3}/upload`;
  }

  upload(files: Set<File>, data): Observable<any> {
    const formData = new FormData();

    files.forEach(file => {
      file.name
      formData.append('file', file, file.name)
    });
    formData.append('dados', JSON.stringify(data))
    // const request = new HttpRequest('POST', this.url, formData)
    // return this.http.request(request);
    const header = this.createHeader();

    return this.http2.post(this.url, formData, { headers: header });
  }

  uploadSolicitacoes(files: Set<File>, data): Observable<any> {
    const formData = new FormData();

    files.forEach(file => {
      file.name
      formData.append('file', file, file.name)
    });
    formData.append('dados', JSON.stringify(data))
    // const request = new HttpRequest('POST', this.url, formData)
    // return this.http.request(request);
    const header = this.createHeader();
    return this.http2.post(`${configHelper.URL3}/solicitacoes/upload`, formData, { headers: header });
  }

  download(path): Observable<any> {
    const header = this.createHeader();
    return this.http.postFile(`${this.url}/download`, { path: path });
  }

  // {
  //   responseType: 'blob' as 'json',
  //   // reportProgress
  // }

  public createHeader(header?: HttpHeaders): HttpHeaders {
    if (!header) {
      header = new HttpHeaders();
    }
    // header = header.append('Content-type', 'application/json');
    // header = header.append('accept', 'application/json');
    header = header.append('user-token', localStorage.getItem(configHelper.storageKeys.tokenAdmin));
    return header
  }


}
