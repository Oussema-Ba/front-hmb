import { Categorie } from './Categorie';
import { UserRole } from './UserRole';
import {UserImage} from './UserImage';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  email: string;
  password: string;
  categorieId: number;
  categorie: Categorie;
  imagePath?: string;
  userRoles: UserRole[];
  userImages: UserImage[];
}
