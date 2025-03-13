import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRolesService } from '../../../services/user-roles.service';
import { UserRole } from '../../../core/models/UserRole';
import { User } from '../../../core/models/User';
import { Role } from '../../../core/models/Role';
import { UserService } from '../../../services/user.service';
import {RoleService} from '../../../services/role.service';

@Component({
  selector: 'app-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.css']
})
export class AddUserRolesComponent implements OnInit {
  userRoleForm!: FormGroup;
  users: User[] = [];
  roles: Role[] = [];
  errorMsg: string[] = [];
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userRolesService: UserRolesService,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
    this.loadRoles();
  }

  initForm() {
    this.userRoleForm = this.fb.group({
      userId: ['', Validators.required],
      roleId: ['', Validators.required]
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users) => this.users = users,
      (error) => this.errorMsg.push("Erreur lors du chargement des utilisateurs")
    );
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(
      (roles) => this.roles = roles,
      (error) => this.errorMsg.push("Erreur lors du chargement des rôles")
    );
  }

  addUserRole() {
    this.errorMsg = [];
    this.successMsg = '';

    if (this.userRoleForm.invalid) {
      this.errorMsg.push("Veuillez sélectionner un utilisateur et un rôle.");
      return;
    }

    const newUserRole: UserRole = {
      id: 0, // L'ID sera généré par la base de données
      userId: this.userRoleForm.value.userId,
      user: this.users.find(u => u.id === this.userRoleForm.value.userId)!,
      roleId: this.userRoleForm.value.roleId,
      role: this.roles.find(r => r.id === this.userRoleForm.value.roleId)!
    };

    this.userRolesService.createUserRole(newUserRole).subscribe(
      () => {
        this.successMsg = "Le rôle a été attribué avec succès.";
        console.log(newUserRole)
        this.router.navigate(['/users/users']);
      },
      (error) => {
        this.errorMsg.push("Erreur lors de l'ajout du rôle utilisateur.");
      }
    );
  }
}
