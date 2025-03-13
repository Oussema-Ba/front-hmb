import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from '../../../core/models/Categorie';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  selectedFile: File | null = null;
  listCategories!: any[] ;
  errorMsg: string[] = [];
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private categorieService: CategorieService
  ) {}

  ngOnInit() {
    this.initUserForm();
    this.loadCategories();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      categorieId: ['', Validators.required],
      image: [null]
    });
  }

  loadCategories() {
    this.categorieService.getCategories().subscribe(
      (res) => {
        this.listCategories = res;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories', error.message);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addUser() {
    this.errorMsg = [];
    this.successMsg = '';

    if (this.userForm.invalid) {
      this.errorMsg.push('Formulaire invalide. Veuillez remplir tous les champs requis.');
      return;
    }

    const newUser = {
      nom: this.userForm.value.nom,
      prenom: this.userForm.value.prenom,
      email: this.userForm.value.email,
      age: this.userForm.value.age,
      password: this.userForm.value.password,
      categorieId: this.userForm.value.categorieId
    };

    const formData = new FormData();
    formData.append('user', JSON.stringify(newUser));

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.userService.createUser(formData).subscribe(
      response => {
        this.successMsg = 'Utilisateur ajouté avec succès!';
        this.router.navigate(['/users']); // Redirection après succès
      },
      (error: { error: string }) => {
        this.errorMsg.push(error.error);
      }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.addUser();
    }
  }
}
