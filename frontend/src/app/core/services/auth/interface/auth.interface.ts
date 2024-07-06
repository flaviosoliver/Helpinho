import { UserDto } from '../../users/dto/user.dto';

export interface Auth {
  email: string;
  userId: number;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserDto;
}
