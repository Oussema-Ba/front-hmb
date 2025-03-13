import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { AddUserRolesComponent } from './add-user-roles/add-user-roles.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [
    UserListComponent,
    ListCategorieComponent,
    UserRolesComponent,
    AddUserRolesComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
