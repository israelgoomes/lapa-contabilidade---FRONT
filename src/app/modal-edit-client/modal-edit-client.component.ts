import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../servicos/cliente-service/cliente.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ModalRequisicaoComponent } from '../modal-requisicao/modal-requisicao.component';

@Component({
  selector: 'app-modal-edit-client',
  templateUrl: './modal-edit-client.component.html',
  styleUrls: ['./modal-edit-client.component.css']
})
export class ModalEditClientComponent implements OnInit {

  clientForm: FormGroup;
  cliente;

  constructor(
    public dialogRef: MatDialogRef<ModalRequisicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router,
    private clientSrvc: ClienteService,
    private spinnerSrvc: NgxUiLoaderService,
    public dialog: MatDialog
  ) {
    this.cliente = this.data.cliente;
    this.clientForm = this.fb.group({
      name: [this.cliente.name, Validators.required],
      empresa: [this.cliente.empresa],
      email: [this.cliente.email, Validators.required],
      celular: [this.cliente.celular, Validators.required],
      cidade: [this.cliente.cidade, Validators.required],
      ruaNumero: [this.cliente.ruaNumero, Validators.required],
      bairro: [this.cliente.bairro, Validators.required],
      complemento: [this.cliente.complemento],
      cep: [this.cliente.cep, Validators.required],
      cpfCnpj: [this.cliente.cpfCnpj, Validators.required],
      idUser: [this.cliente.idUser, Validators.required],
    })
  }


  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
