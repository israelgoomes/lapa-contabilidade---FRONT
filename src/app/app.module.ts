import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    ServicesComponent,
    FooterComponent,
    ServicosMobileComponent,
    ServicesMobileComponent,
    ClientsMobileComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
