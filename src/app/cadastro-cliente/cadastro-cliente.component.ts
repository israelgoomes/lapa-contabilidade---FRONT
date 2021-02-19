import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../servicos/cliente-service/cliente.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private clientSrvc: ClienteService,
    private spinnerSrvc: NgxUiLoaderService,
    public dialog: MatDialog
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      empresa: [''],
      email: ['', Validators.required],
      celular: ['', Validators.required],
      cidade: ['', Validators.required],
      ruaNumero: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: [''],
      cep: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      senha: ['', Validators.required],
      // idCliente: ['', Validators.required],
      // ativo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  salvar() {
    // console.log(this.clientForm.value)
    // console.log(this.clientForm.get('name').value)
    this.spinnerSrvc.startLoader('cadastro-cliente-loader');
    this.clientSrvc.createClient(this.clientForm.value).subscribe(response => {
      this.spinnerSrvc.stopLoader('cadastro-cliente-loader');
      this.dialog.open(DialogComponent, {
        width: '450px',
        data: { text: 'Cadastro', subText: `O usuário ${this.clientForm.get('name').value} foi cadastro com sucesso!`, icon: 'app_registration' }
      });
      this.router.navigate(['/admin-home']);
      this.clientForm.reset();
    })
  }

}
