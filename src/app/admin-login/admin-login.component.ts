import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginAdminService } from '../servicos/login-admin-service/login-admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';





@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  isCadastro: boolean = false;

  constructor(

    private loginSrvc: LoginAdminService,
    private route: Router,
    private spinnerSrvc: NgxUiLoaderService,
    public dialog: MatDialog
    // private alertSrvc: AlertService,
    // public fb: Facebook
  ) { }

  ngOnInit() {
    if (this.loginSrvc.getToken()) {
      this.route.navigate(['/admin-home'])
    }

  }



  login(f: NgForm) {
    this.spinnerSrvc.startLoader('admin-loader');
    this.loginSrvc.authenticate(f.value.cnpjCpf, f.value.password).subscribe(
      (data) => {
        this.loginSrvc.registerUser(data.usuario);
        this.loginSrvc.registerToken(data.token);
        // this.loginSrvc.registerUser(JSON.stringify(data.usuario));
        this.spinnerSrvc.stopLoader('admin-loader');
        this.route.navigate(['/admin-home']);
        // this.alertSrvc.toast('Login efetuado com sucesso!', 2000, 'top');
        f.reset();
      },
      (error) => {
        this.spinnerSrvc.stopLoader('admin-loader');
        this.dialog.open(DialogComponent, {
          width: '450px',
          data: { text: 'Erro!', subText: error.error.message, icon: 'error_outline', class: 'error' }
        });
      }
    );
  }

  cadastrar() {
    this.isCadastro = true;
  }

  teste(e) {
    this.isCadastro = e;
  }


}
