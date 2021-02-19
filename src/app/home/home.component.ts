import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginClientService } from '../servicos/login-client-service/login-client.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isMobile: boolean = false;
  classMenu = "menu";
  classLogin = "login"
  breakpoint = 3;
  breakpoint2 = 2;
  rowHeight = "3:2"
  rowHeight2 = "2:1"
  listener;
  cpfCnpj;
  senha;
  onUser;
  isLogged: boolean = false;

  imagens = [
    { path: '../../assets/img/img1.jpg' },
    { path: '../../assets/img/img1.jpg' },
    { path: '../../assets/img/img1.jpg' },
    // { path: '/assets/img/clientes/obrasileiro_marmitex.jpeg' },
    // { path: '/assets/img/clientes/platform_builders.jpeg' },
    // { path: '/assets/img/clientes/sigas.jpeg', width: '90%' },
  ]

  constructor(private renderer2: Renderer2,
    private loginSrvc: LoginClientService,
    private router: Router,
    private spinnerSrvc: NgxUiLoaderService,
    public dialog: MatDialog) {
    this.listener = this.renderer2.listen('window', 'scroll', (e) => {
      let scrollTopPosition = e.path[0].scrollingElement.scrollTop

      if (scrollTopPosition >= 125) {
        this.classMenu = "scroll"
      } else {
        this.classMenu = "menu"
      }

      // console.log(e.path[0].scrollingElement.scrollTop)
      //console.log('Position', this.getYPosition(e));
    });
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  ngOnDestroy(): void {
    this.listener();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '450px',
      data: { text: 'Texto Teste', subText: 'Subs texto teste', icon: 'cloud_upload' }
    });
  }

  ngOnInit(): void {
    this.detectar_mobile();
    if (this.loginSrvc.getToken() && this.loginSrvc.getUser()) {
      this.onUser = this.loginSrvc.getUser()[0];
      this.isLogged = true;
    }

  }

  onResize(e) {
    this.breakpoint = (e.target.innerWidth <= 1600 && e.target.innerWidth >= 1000) ? 2 : (e.target.innerWidth <= 1000) ? 1 : 3;
    this.rowHeight = (e.target.innerWidth <= 1600 && e.target.innerWidth >= 1000) ? "2:1" : (e.target.innerWidth <= 1000) ? "3:4" : "3:2";
    //console.log('altura', this.rowHeight)
  }

  onResize2(e) {
    this.breakpoint2 = (e.target.innerWidth <= 800) ? 1 : 2;
    this.rowHeight2 = (e.target.innerWidth <= 1600 && e.target.innerWidth >= 900) ? "3:2" : (e.target.innerWidth >= 1800) ? "2:1" : (e.target.innerWidth <= 900) ? "3:3" : "2:1";
  }

  getScrollingElement(): Element {
    return document.scrollingElement || document.documentElement;
  }

  detectar_mobile() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.isMobile = true;
    }
    else {
      this.isMobile = false;
    }
  }

  login() {
    this.spinnerSrvc.startLoader('login-client');
    this.loginSrvc.clientAuthenticate(this.cpfCnpj, this.senha).subscribe(response => {
      this.loginSrvc.registerToken(response.token);
      this.loginSrvc.registerUser(response.usuario)

      if (response.usuario[0].atualizaSenha == 'S') {
        this.router.navigate(['/password-update']);
        this.spinnerSrvc.stopLoader('login-client');
      } else {
        this.ngOnInit();
        this.spinnerSrvc.stopLoader('login-client');
      }
      // this.router.navigateByUrl('/document-list', {
      //   state: { cliente: 'cliente' }
      // })
    }, error => {
      this.spinnerSrvc.stopLoader('login-client');
      this.dialog.open(DialogComponent, {
        width: '450px',
        data: { text: 'Erro!', subText: error.error.message, icon: 'error_outline', class: 'error' }
      });
    });
  }

  sair() {
    this.loginSrvc.logout();
    this.isLogged = false;
    this.ngOnInit();
  }

  documentos() {
    this.router.navigate(['/document-list'])
  }

  solicitacoes() {
    this.router.navigate(['/solicitacoes'])
  }
}
