import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalEditClientComponent } from '../modal-edit-client/modal-edit-client.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClienteService } from '../servicos/cliente-service/cliente.service';

@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.css']
})
export class AdminClientesComponent implements OnInit {

  displayedColumns: string[] = [
    'edit',
    'name',
    'empresa',
    'email',
    'celular',
    'cidade',
    'ruaNumero',
    'bairro',
    'complemento',
    'cep',
    'cpfCnpj',
    'upload',
    'documentos',
    'solicitacoes'
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() clientes: any;
  @Output() edit = new EventEmitter

  constructor(private router: Router,
    public dialog: MatDialog,
    private spinnerSrvc: NgxUiLoaderService,
    private clientSrvc: ClienteService
  ) {
  }

  ngOnInit(): void {
    this.clientSrvc.updateAdminClient.subscribe(() => {
      setTimeout(() => {
        this.dataSource.data = this.clientes
      }, 500)
    })

    this.dataSource.data = this.clientes

    this.dataSource.paginator = this.paginator;
  }

  upload(cliente) {
    this.router.navigateByUrl('/upload', {
      state: { cliente: cliente }
    })
  }

  documentos(cliente) {
    this.router.navigateByUrl('/document-list', {
      state: { cliente: cliente }
    })
  }

  solicitacoes(cliente) {
    this.router.navigateByUrl('/solicitacao-admin', {
      state: { cliente: cliente }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editar(param): void {
    this.edit.emit(param);

    //   const dialogRef = this.dialog.open(ModalEditClientComponent, {
    //     width: '600px',
    //     data: { cliente: param }
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('CLiente', result)
    //     if (!result) return;
    //     this.spinnerSrvc.startLoader('edit-client-loader');
    //     this.clientSrvc.updateClient(result).subscribe(response => {
    //       console.log('Cliente atualizado com sucesso', response)
    //       this.spinnerSrvc.stopLoader('edit-client-loader');
    //       this.ngOnInit();
    //     });
    //   });
  }

}
