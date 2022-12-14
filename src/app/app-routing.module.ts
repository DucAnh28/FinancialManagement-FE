import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserHomeComponent} from "./user/home/user-home/user-home.component";
import {AuthGuard} from "./helper/auth-guard";


const routes: Routes = [
  {
    path: 'backyard',
    // canActivateChild: [AdminAuthGuard],
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
