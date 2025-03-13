import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { User } from '../../../core/models/User';
import { environment } from '../../../../environments/environment';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  documents: { type: string, url: string }[] = [];
  userRoles: any[] = [];
  selectedUser!: User;
  users: User[] = [];
  selectedFiles: File[] = []; // ✅ Liste des fichiers sélectionnés
  errorMsg: string[] = [];
  successMsg: string = '';
  addForm!: FormGroup;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.initForm();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (res) => {
        if (res) {
          this.users = res;
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des données", error.message);
      }
    );
  }

  openRolesModal(content: any, user: User): void {
    this.selectedUser = user;
    this.userService.getUserRolesByUserId(user.id).subscribe(
      (roles) => {
        this.userRoles = roles.roles;
        this.modalService.open(content, { size: 'lg' });
      },
      (error) => {
        console.error("Erreur lors de la récupération des rôles", error.message);
      }
    );
  }

  initForm(): void {
    this.addForm = this.fb.group({
      files: this.fb.array([])
    });
    this.addFileInput();
  }

  get photosFormArray(): FormArray {
    return this.addForm.get('files') as FormArray;
  }

  addFileInput(): void {
    this.photosFormArray.push(this.fb.control(null, Validators.required));
  }

  removeFileInput(index: number): void {
    if (this.photosFormArray.length > 1) {
      this.photosFormArray.removeAt(index);
      this.selectedFiles.splice(index, 1); // ✅ Supprimer aussi du tableau des fichiers
    }
  }

  openUploadModal(content: any, user: User): void {
    this.selectedUser = user;
    this.initForm();
    this.selectedFiles = []; // ✅ Réinitialiser les fichiers sélectionnés
    this.modalService.open(content, { centered: true });
  }

  isUploading: boolean = false; // Pour afficher le loader

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[index] = file; // ✅ Stocker le fichier dans selectedFiles[]
      console.log("Fichier ajouté:", file);
    }
  }

  uploadFiles(): void {
    const formData = new FormData();
    this.selectedFiles.forEach((file, index) => {
      formData.append('files', file); // Utilisez 'files' comme clé
      console.log("file.name:", file.name);
    });

    // Affichez le contenu de FormData pour vérification
    for (let pair of (formData as any).entries()) {
      console.log(pair[0], pair[1]);
    }

    this.userService.uploadUserFiles(this.selectedUser.id, formData).subscribe(
      (response) => {
        console.log("✅ Réponse du serveur:", response);
        this.successMsg = "Fichiers téléchargés avec succès!";
        this.modalService.dismissAll();
      },
      (error) => {
        console.error("❌ Erreur lors du téléchargement des fichiers:", error);
        this.errorMsg.push("Erreur lors du téléchargement des fichiers.");
      }
    );
  }  protected readonly environment = environment;
}
