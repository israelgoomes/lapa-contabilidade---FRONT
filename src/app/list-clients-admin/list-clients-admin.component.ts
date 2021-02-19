import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-clients-admin',
  templateUrl: './list-clients-admin.component.html',
  styleUrls: ['./list-clients-admin.component.css']
})


export class ListClientsAdminComponent implements OnInit {

  @Input() cliente: any;
  status;
  statusName;
  clientForm: FormGroup;
  edit: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.status = this.cliente.ativo == 'S' ? true : false
    this.statusName = this.status == true ? 'Ativo' : 'Inativo'


    this.clientForm = this.fb.group({
      name: [this.cliente.name],
      empresa: this.cliente.empresa,
      email: this.cliente.email,
      celular: this.cliente.celular,
      cidade: this.cliente.cidade,
      ruaNumero: this.cliente.ruaNumero,
      bairro: this.cliente.bairro,
      complemento: this.cliente.complemento,
      cep: this.cliente.cep,
      cpfCnpj: this.cliente.cpfCnpj,
      idCliente: this.cliente.idCLiente,
      ativo: this.cliente.ativo
    })
    this.clientForm.disable();
  }

  upload() {
    this.router.navigateByUrl('/upload', {
      state: { cliente: this.cliente }
    })
  }

  documentos() {
    this.router.navigateByUrl('/document-list', {
      state: { cliente: this.cliente }
    })
  }

  editar() {
    this.clientForm.enable();
    this.edit = true;
  }

  cancelarEdit() {
    this.edit = false;
    this.clientForm.disable();
  }

  salvar() {
    let ativo = this.statusName == 'Ativo' ? 'S' : 'N';
  }

  onChange() {
    this.clientForm.patchValue({})
    if (this.status == true) {
      this.statusName = "Ativo"
      this.clientForm.patchValue({ ativo: 'S' })
    } else if (this.status == false) {
      this.statusName = "Inativo"
      this.clientForm.patchValue({ ativo: 'N' })
    }
  }

}
