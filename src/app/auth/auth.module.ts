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
        whitelistedDomains: ['localhost:3000', '203.157.104.222:3000', '127.0.0.1:3000', '203.157.104.222'],
        // blacklistedRoutes: ['localhost:3000/login/']
      }
    })
  ]
})
export class AuthModule { }
