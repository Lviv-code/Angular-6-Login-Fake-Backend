import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_services/auth.guard';
import {RegisterComponent} from './register/register.component';

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'items', component: HomeComponent, canActivate: [AuthGuard]},


  // redirect to home
  {path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes);
