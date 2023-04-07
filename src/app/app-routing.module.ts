import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Register2Component } from './register2/register2.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NewRegisterComponent } from './new-register/new-register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'register', component: RegisterComponent },
  // { path: 'register2', component: Register2Component },
  { path: 'reset-password', component: ResetPasswordComponent },
  // new
  { path: 'new-register', component: NewRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
