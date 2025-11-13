import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/qa-platform/qa-platform.component').then(m => m.QaPlatformComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
