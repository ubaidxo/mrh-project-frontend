import { Routes } from '@angular/router';
import { HomeComponent } from './admin/components/home/home/home.component';
import { LoginComponent } from './admin/components/login/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate : [authGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
