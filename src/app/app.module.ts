import { Register2Component } from './register2/register2.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth-guard.service';
import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { StaffModule } from './staff/staff.module';
import { AlertService } from './help/alert.service';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HelpModule } from './help/help.module';
import { RegisterDrugComponent } from './register-drug/register-drug.component';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    RegisterDrugComponent,
    Register2Component
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AuthModule,
    LoginModule,
    AdminModule,
    ManagerModule,
    StaffModule,
    FormsModule,
    HelpModule
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
