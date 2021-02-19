import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalRequisicaoComponent } from '../modal-requisicao/modal-requisicao.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LoginClientService } from '../servicos/login-client-service/login-client.service';
import { SolicitacaoService } from '../servicos/solicitacao-service/solicitacao.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitacoes-admin',
  templateUrl: './solicitacoes-admin.component.html',
  styleUrls: ['./solicitacoes-admin.component.css']
})
export class SolicitacoesAdminComponent implements OnInit {

  displayedColumns: string[] = [
    'titulo',
    'cdSolicitacao',
    'detalhes',
    'ativo'
  ];

  cliente;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private loginSrvc: LoginClientService,
    private solicitacaoSrvc: SolicitacaoService,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (!history.state.cliente) {
      this.router.navigate(['/admin-home'])
      return
    }
    this.cliente = history.state.cliente;

  }


  ngOnInit(): void {
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
    this.router.navigateByUrl('/solicitacao-detalhe-admin', {
      state: { data: solicitacao, cliente: this.cliente }
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ModalRequisicaoComponent, {
      width: '600px',
      // height: '600px',
      data: { idUser: this.cliente.idUser, name: this.cliente.nome }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.solicitacaoSrvc.criarSolicitacao(result).subscribe(response => {
        this.ngOnInit();
      });
    });
  }
}
