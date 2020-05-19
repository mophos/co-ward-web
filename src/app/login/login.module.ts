import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { HelpModule } from '../help/help.module';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoginRoutingModule,
    HelpModule,
    ClarityModule
  ],
  declarations: [LoginComponent, LoginDashboardComponent],
  providers: [LoginService]
})
export class LoginModule { }
