import { SolicitacoesAdminComponent } from './solicitacoes-admin/solicitacoes-admin.component';
import { SolicitacaoDetalheComponent } from './solicitacao-detalhe/solicitacao-detalhe.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminClientesComponent } from './admin-clientes/admin-clientes.component';
import { UploadComponent } from './upload/upload.component';
import { ListaDocumentosClientAdminComponent } from './lista-documentos-client-admin/lista-documentos-client-admin.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { AuthGuardService } from './servicos/auth-guard-service/auth-guard.service';
import { AuthClientService } from './servicos/auth-client-service/auth-client.service';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { SolicitacoesClienteComponent } from './solicitacoes-cliente/solicitacoes-cliente.component';
import { SolicitacoesDetalheAdminComponent } from './solicitacoes-detalhe-admin/solicitacoes-detalhe-admin.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuardService] },
  { path: 'admin-clientes', component: AdminClientesComponent, canActivate: [AuthGuardService] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuardService] },

  // {
  //   path: 'admin-home',
  //   component: AdminHomeComponent,
  //   children: [
  //     { path: '', redirectTo: 'upload', pathMatch: 'full' },
  //     { path: 'upload', component: UploadComponent },
  //     { path: 'document-list', component: ListaDocumentosClientAdminComponent },
  //   ],
  // },

  { path: 'document-list', component: ListaDocumentosClientAdminComponent, canActivate: [AuthClientService] },
  { path: 'password-update', component: PasswordUpdateComponent, canActivate: [AuthClientService] },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'solicitacoes', component: SolicitacoesClienteComponent, canActivate: [AuthClientService] },
  { path: 'solicitacao-detalhe', component: SolicitacaoDetalheComponent, canActivate: [AuthClientService] },
  { path: 'solicitacao-admin', component: SolicitacoesAdminComponent, canActivate: [AuthGuardService] },
  { path: 'solicitacao-detalhe-admin', component: SolicitacoesDetalheAdminComponent, canActivate: [AuthClientService] },

]