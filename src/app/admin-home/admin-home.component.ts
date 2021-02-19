import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ClienteService } from '../servicos/cliente-service/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalEditClientComponent } from '../modal-edit-client/modal-edit-client.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  clientes: Array<any> = [];
  constructor(private clienteSrvc: ClienteService,
    public dialog: MatDialog,
    private spinnerSrvc: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.clienteSrvc.listarClientes().subscribe(response => {
      this.clientes = response
      // this.clienteSrvc.updateAdminClient.emit();
    })

  }


  editar(param): void {
    const dialogRef = this.dialog.open(ModalEditClientComponent, {
      width: '600px',
      // height: '600px',
      data: { cliente: param }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.spinnerSrvc.startLoader('edit-client-loader');
      this.clienteSrvc.updateClient(result).subscribe(response => {
        this.spinnerSrvc.stopLoader('edit-client-loader');
        this.ngOnInit();
        this.clienteSrvc.updateAdminClient.emit();
      });
    });


  }
}
