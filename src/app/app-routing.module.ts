import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ActiveUserGuard } from '@authentication/active-user.guard';
import { UserComponent } from './user/user.component';


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
