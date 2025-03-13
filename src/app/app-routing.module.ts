import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  //{ path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  {
    path: 'dashboard', canActivate:[GuardService], loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  } ,
  {
    path: 'users', canActivate:[GuardService], loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
    {
    path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/signin'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
