import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormTiposCambioComponent } from './components/form-tipos-cambio/form-tipos-cambio.component';
import { FormValidarLoginComponent } from './components/form-validar-login/form-validar-login.component';


const routes: Routes = [
  { path: '', component: FormValidarLoginComponent},
  { path: 'tipos-cambio', component: FormTiposCambioComponent},
  { path: 'login', component: FormValidarLoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
