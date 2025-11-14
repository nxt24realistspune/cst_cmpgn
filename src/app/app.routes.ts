import { Routes } from '@angular/router';
import { QaPlatformComponent } from './components/qa-platform/qa-platform.component';
import { LinkCheckerComponent } from './components/link-checker/link-checker.component';

export const routes: Routes = [
  { path: '', component: QaPlatformComponent },
  { path: 'qa-platform', component: QaPlatformComponent },
  { path: 'link-checker', component: LinkCheckerComponent },
  { path: '**', redirectTo: '' },
];
