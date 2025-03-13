import {User} from './User';

export interface Categorie {
  id: number;
  libelle: string;
  users: User[];
}
