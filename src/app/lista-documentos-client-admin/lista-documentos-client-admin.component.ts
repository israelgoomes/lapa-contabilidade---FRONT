import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../servicos/document-service/document.service';
import { UploadService } from '../servicos/upload-service/upload.service';
import { configHelper } from '../configurations/configHelper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import * as moment from 'moment'
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-documentos-client-admin',
  templateUrl: './lista-documentos-client-admin.component.html',
  styleUrls: ['./lista-documentos-client-admin.component.css']
})
export class ListaDocumentosClientAdminComponent implements OnInit {

  displayedColumns: string[] = [
    'nmDocumento',
    'tpDocumento',
    'dtCriacao',
    'mesRef',
    'download'
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  cliente;
  documentos;
  folhasPagamento: Array<any> = [];
  impostosMensais: Array<any> = [];
  relatorioContabeis: Array<any> = [];
  solicitacoes: Array<any> = [];
  financeiro: Array<any> = [];
  idUser;
  //variaáveis de controle
  fp: boolean = true;
  im: boolean = false;
  rc: boolean = false;
  sl: boolean = false;
  fn: boolean = false;

  tipoDoc;

  tiposDoc = [
    { tipo: 'Folha de Pagamento', value: 'fp' },
    { tipo: 'Impostos Mensais', value: 'im' },
    { tipo: 'Relatórios Contábeis', value: 'rc' },
    { tipo: 'Solicitações', value: 'sl' },
    { tipo: 'Financeiro', value: 'fn' },
  ]



  constructor(private docSrvc: DocumentService,
    private uploadSrvc: UploadService,
    private spinnerSrvc: NgxUiLoaderService,
    public dialog: MatDialog,
    private route: Router) {
    this.cliente = JSON.parse(localStorage.getItem(configHelper.storageKeys.user))
    if (!this.cliente) {
      this.cliente = history.state.cliente;
      if (!this.cliente) {
        this.route.navigate(['/admin-home']);
        return
      }
      this.idUser = {
        idUser: this.cliente.idUser
      }
    } else {
      this.idUser = {
        idUser: this.cliente[0].idUser
      }
    }


  }

  ngOnInit(): void {
    this.spinnerSrvc.startLoader('doc-loader')
    this.docSrvc.listarDocumentos(this.idUser).subscribe(response => {
      this.converteData(response);
      this.documentos = response
      this.dataSource.data = response
      this.spinnerSrvc.stopLoader('doc-loader')


    }, errpr => {
      this.spinnerSrvc.stopLoader('doc-loader')
    });
    this.dataSource.paginator = this.paginator;
  }

  onDownload(doc) {
    let path = doc.caminho;
    this.spinnerSrvc.startLoader('doc-loader')
    this.uploadSrvc.download(path).subscribe(response => {
      const file = new Blob([response], {
        type: response.type
      });

      this.spinnerSrvc.stopLoader('doc-loader')
      const blob = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = blob;
      link.download = `${doc.nmDocumento}.pdf`
      link.click();

      window.URL.revokeObjectURL(blob);
      link.remove();

      this.dialog.open(DialogComponent, {
        width: '450px',
        data: { text: 'Download', subText: `O Arquivo ${doc.nmDocumento} foi baixado com sucesso!`, icon: 'cloud_download' }
      });

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange() {
    switch (this.tipoDoc) {
      case 'fp':
        this.fp = true;
        this.im = false;
        this.rc = false;
        this.sl = false;
        this.fn = false;
        break;
      case 'im':
        this.fp = false;
        this.im = true;
        this.rc = false;
        this.sl = false;
        this.fn = false;
        break;
      case 'rc':
        this.fp = false;
        this.im = false;
        this.rc = true;
        this.sl = false;
        this.fn = false;
        break;
      case 'sl':
        this.fp = false;
        this.im = false;
        this.rc = false;
        this.sl = true;
        this.fn = false;
        break;
      case 'fn':
        this.fp = false;
        this.im = false;
        this.rc = false;
        this.sl = false;
        this.fn = true;
        break;
    }

  }



  converteData(data) {
    data.forEach(doc => {


      doc.dtCriacao = moment(doc.dtCriacao).format("DD/MM/YYYY");
      doc.mesRef = moment(doc.mesRef).format("DD/MM/YYYY");

      switch (doc.tpDocumento) {
        case 'fp':
          doc.tpDocumento = "Folhas de Pagamento"
          // this.folhasPagamento.push(doc);
          break;
        case 'im':
          doc.tpDocumento = "Impostos Mensais"
          // this.impostosMensais.push(doc);
          break;
        case 'rc':
          doc.tpDocumento = "Relatórios Contábeis"
          // this.relatorioContabeis.push(doc);
          break;
        case 'sl':
          doc.tpDocumento = "Solicitações"
          // this.solicitacoes.push(doc);
          break;
        case 'fn':
          doc.tpDocumento = "Financeiro"
          // this.financeiro.push(doc);
          break;
      }
    })
  }
}

