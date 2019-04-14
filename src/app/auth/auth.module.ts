import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [ SignupComponent, LoginComponent],
  imports: [SharedModule, AngularFireAuthModule, AuthRoutingModule],
  providers: [],
  exports: []
})
export class AuthModule {}
