import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CompleteRegistrationComponent } from './pages/complete-registration/complete-registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent
      }
    ]
  },
  {
    path: 'complete-registration',
    component: CompleteRegistrationComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
