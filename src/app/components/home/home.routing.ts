import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-movies',
        component: HomeComponent,
        data: {
          title: 'Home'
        }
      }
    ]
  }
];
