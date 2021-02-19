import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginClientService } from '../servicos/login-client-service/login-client.service';
import { ClienteService } from '../servicos/cliente-service/cliente.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {
  changePasswordForm: FormGroup

  cliente;

  constructor(private fb: FormBuilder,
    private loginSrvc: LoginClientService,
    private clientSrvc: ClienteService,
    private router: Router,
    private spinnerSrvc: NgxUiLoaderService,
    public dialog: MatDialog
  ) {

    this.cliente = this.loginSrvc.getUser();
    this.changePasswordForm = fb.group({
      senhaAntiga: '',
      novaSenha: '',
      confirmaSenha: '',
      idUser: this.cliente[0].idUser
    })
  }

  ngOnInit(): void {
  }

  alterar() {
    this.spinnerSrvc.startLoader('update-loader')
    this.clientSrvc.updatePassword(this.changePasswordForm.value).subscribe(response => {
      this.router.navigate(['/'])
      this.cliente[0].atualizaSenha = 'N';
      this.loginSrvc.registerUser(this.cliente);
      this.spinnerSrvc.stopLoader('update-loader')

    }, error => {
      this.dialog.open(DialogComponent, {
        width: '450px',
        data: { text: 'Erro!', subText: error.error.message, icon: 'error_outline', class: 'error' }
      });
    })

  }


}
