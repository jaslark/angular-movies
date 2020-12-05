import { Routes } from '@angular/router';

import { BlankComponent } from './components/layout/blank/blank.component';
import { FullComponent } from './components/layout/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home/all-movies',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./components/home/home.module').then(
            m => m.HomeModule
          ),  
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            m => m.AuthenticationModule
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
