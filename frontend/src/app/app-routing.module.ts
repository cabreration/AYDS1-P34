import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CheckBalanceComponent } from './check-balance/check-balance.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TipocambioComponent } from './tipocambio/tipocambio.component';
import { ReporteComponent } from './reporte/reporte.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tipocambio', component: TipocambioComponent },
  { path: 'check-balance', component: CheckBalanceComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'reporte', component: ReporteComponent},
  { path: 'money-transfer', component: MoneyTransferComponent} //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
