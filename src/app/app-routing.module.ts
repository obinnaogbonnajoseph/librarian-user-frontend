import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ActiveUserGuard } from '@authentication/active-user.guard';
import { UserComponent } from './user/user.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { CanDeactivateGuard } from '@utils/can-deactivate/can-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    pathMatch: 'full',
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'librarian',
    loadChildren: './librarian/librarian.module#LibrarianModule',
    canActivate: [ActiveUserGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    pathMatch: 'full',
    canActivate: [ActiveUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
