import {UserRole} from './UserRole';

export interface Role {
  id: number;
  libelle: string;
  userRoles: UserRole[];
}
