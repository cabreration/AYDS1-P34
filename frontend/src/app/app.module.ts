import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { RestService } from './rest.service';
import { PerfilComponent } from './perfil/perfil.component';
import { TipocambioComponent } from './tipocambio/tipocambio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PerfilComponent,
    TipocambioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ RestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
