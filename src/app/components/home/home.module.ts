import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
