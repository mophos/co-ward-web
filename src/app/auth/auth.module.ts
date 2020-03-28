import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3000', '192.168.4.177:3000', '192.168.4.149:3000'],
        // blacklistedRoutes: ['localhost:3000/login/']
      }
    })
  ]
})
export class AuthModule { }
