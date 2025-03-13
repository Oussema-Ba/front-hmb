import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConfig } from 'ngx-countries-dropdown';
import {RegistrationRequest} from '../../../core/models/registration-request';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {Categorie} from '../../../core/models/Categorie';
import {CategorieService} from '../../../services/categorie.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;
  selectedFile: File | null = null;
  showPassword = false;
  title = "";
  errorMsg: string[] = [];
  successMsg: string = '';

  listCategories!: any []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private categorieService :CategorieService
  ) {}

  ngOnInit() {
    this.initSignUpForm();
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categorieService.getCategories().subscribe(
      (res) => {
        if (res) {
          this.listCategories = res;
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des data", error.message);
      });

  }

  initSignUpForm() {
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      categorieId: ['', Validators.required],
      image: [null]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  signUp() {
    this.errorMsg = [];
    this.successMsg = '';

    if (this.registrationForm.invalid) {
      this.errorMsg.push('Formulaire invalide. Veuillez remplir tous les champs requis.');
      return;
    }

    const newUser = {
      nom: this.registrationForm.value.nom,
      prenom: this.registrationForm.value.prenom,
      email: this.registrationForm.value.email,
      age: this.registrationForm.value.age,
      password: this.registrationForm.value.password,
      categorieId: this.registrationForm.value.categorieId
    };

    const formData = new FormData();
    formData.append('user', JSON.stringify(newUser));


    this.authService.register(formData).subscribe(
      response => {
        this.successMsg = 'Registration successful!';
        this.router.navigate(['/auth/signin']);
      },
      (error: { error: string }) => {
        this.errorMsg.push(error.error);
      }
    );
  }


  onSubmit() {
    if (this.registrationForm.valid) {
      this.signUp();
    }
  }
}
