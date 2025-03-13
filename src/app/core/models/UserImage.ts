import {User} from './User';

export interface UserImage {
  id: number;
  imagePath: string;
  userId: number;
  user: User;
}
