import {User} from './User';
import {Role} from './Role';

export interface UserRole {
  id: number;
  userId: number;
  user: User;
  roleId: number;
  role: Role;
}
