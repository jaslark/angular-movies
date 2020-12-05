import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutes } from './authentication.routing';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(AuthenticationRoutes),
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent
  ],
  providers: []
})
export class AuthenticationModule {}
