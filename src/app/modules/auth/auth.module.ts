import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthComponent } from './auth.component';
import { UserProfileComponent } from '../layout/user-profile/user-profile.component';


@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    AuthComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule { }
