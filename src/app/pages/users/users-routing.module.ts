import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SidebarComponent} from '../../layout/sidebar/sidebar.component';
import {UserListComponent} from './user-list/user-list.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import {AddUserRolesComponent} from './add-user-roles/add-user-roles.component';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  {
    path: '', component: SidebarComponent,
    children: [
      {path: 'users', component: UserListComponent},
      {path: 'categories', component:ListCategorieComponent },
      {path: 'addUserRoles', component:AddUserRolesComponent },
      {path: 'add', component: AddUserComponent},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
