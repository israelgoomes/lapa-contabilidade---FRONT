import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginClientService } from '../servicos/login-client-service/login-client.service';
import { SolicitacaoService } from '../servicos/solicitacao-service/solicitacao.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalRequisicaoComponent } from '../modal-requisicao/modal-requisicao.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-solicitacoes-cliente',
  templateUrl: './solicitacoes-cliente.component.html',
  styleUrls: ['./solicitacoes-cliente.component.css']
})


export class SolicitacoesClienteComponent implements OnInit {
  displayedColumns: string[] = [
    'titulo',
    'cdSolicitacao',
    'detalhes',
    'ativo',
  ];

  ativoInativo: string;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private loginSrvc: LoginClientService,
    private solicitacaoSrvc: SolicitacaoService,
    private router: Router,
    public dialog: MatDialog,
    private spinnerSrvc: NgxUiLoaderService
  ) { }

  cliente;

  ngOnInit(): void {
    this.cliente = this.loginSrvc.getUser()[0];
    this.solicitacaoSrvc.listaSolicitacoes(this.cliente.idUser).subscribe(response => {
      this.dataSource.data = response
    })
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detalhes(solicitacao) {
    this.router.navigateByUrl('/solicitacao-detalhe', {
      state: { data: solicitacao }
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ModalRequisicaoComponent, {
      width: '600px',
      // height: '600px',
      data: { user: this.cliente, name: this.cliente.nome }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.spinnerSrvc.startLoader('solicitao-client-loader');
      this.solicitacaoSrvc.criarSolicitacao(result).subscribe(response => {
        this.spinnerSrvc.stopLoader('solicitao-client-loader');
        this.ngOnInit();
      });
    });
  }

}
