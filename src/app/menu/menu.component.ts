import { Component, OnInit, Input } from '@angular/core';
import { LoginAdminService } from '../servicos/login-admin-service/login-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() isSimpleMenu: boolean;
  @Input() back?: string;
  constructor(private loginSrvc: LoginAdminService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginSrvc.logout();
    this.router.navigate(['/admin'])
  }

  voltar() {
    if (this.back == 'solicitacoes') { this.router.navigate(['/solicitacoes']) }
    else if (this.back == 'solicitacoes-admin ') {
      this.router.navigate(['/solicitacoes-admin'])
    } else {
      this.router.navigate(['/admin-home'])
    }
  }

}
