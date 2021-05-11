import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { ClientsComponent } from './clients/clients.component';
import { ServicesComponent } from './services/services.component';
import { FooterComponent } from './footer/footer.component';
import { ServicosMobileComponent } from './servicos-mobile/servicos-mobile.component';
import { ServicesMobileComponent } from './services-mobile/services-mobile.component';
import { ClientsMobileComponent } from './clients-mobile/clients-mobile.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdminService } from './servicos/login-admin-service/login-admin.service';
// import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminClientesComponent } from './admin-clientes/admin-clientes.component';
import { MenuComponent } from './menu/menu.component';
import { UploadComponent } from './upload/upload.component';
import { ListaDocumentosClientAdminComponent } from './lista-documentos-client-admin/lista-documentos-client-admin.component';
import { ListClientsAdminComponent } from './list-clients-admin/list-clients-admin.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { DialogComponent } from './dialog/dialog.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { SolicitacoesClienteComponent } from './solicitacoes-cliente/solicitacoes-cliente.component';
import { SolicitacaoDetalheComponent } from './solicitacao-detalhe/solicitacao-detalhe.component';
import { ModalRequisicaoComponent } from './modal-requisicao/modal-requisicao.component';
import { SolicitacoesAdminComponent } from './solicitacoes-admin/solicitacoes-admin.component';
import { SolicitacoesDetalheAdminComponent } from './solicitacoes-detalhe-admin/solicitacoes-detalhe-admin.component';
import { ModalUploadAdminComponent } from './modal-upload-admin/modal-upload-admin.component';
import { ModalEditClientComponent } from './modal-edit-client/modal-edit-client.component';
import { ModalAplicativoComponent } from './modal-aplicativo/modal-aplicativo.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';

// const configSpinner: NgxUiLoaderConfig = {
//   bgsColor: 'red',
//   bgsPosition: POSITION.centerCenter,
//   bgsSize: 40,
//   bgsType: SPINNER.wanderingCubes, // background spinner type
//   fgsType: SPINNER.threeStrings, // foreground spinner type
//   pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
//   pbThickness: 5, // progress bar thickness
//   text: "Carregando dados...",
//   fgsColor: '#527F76',
//   logoUrl: "../assets/img/logo1.jpeg"

// }


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    ServicesComponent,
    FooterComponent,
    ServicosMobileComponent,
    ServicesMobileComponent,
    ClientsMobileComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminClientesComponent,
    MenuComponent,
    UploadComponent,
    ListaDocumentosClientAdminComponent,
    ListClientsAdminComponent,
    PasswordUpdateComponent,
    DialogComponent,
    CadastroClienteComponent,
    SolicitacoesClienteComponent,
    SolicitacaoDetalheComponent,
    ModalRequisicaoComponent,
    SolicitacoesAdminComponent,
    SolicitacoesDetalheAdminComponent,
    ModalUploadAdminComponent,
    ModalEditClientComponent,
    ModalAplicativoComponent,
    PoliticaPrivacidadeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    IvyCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    // NgxUiLoaderModule.forRoot(configSpinner),
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [LoginAdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
