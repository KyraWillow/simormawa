import { Role } from '../../domain/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;

  constructor(user: { id: string; email: string; name: string; role: Role; isActive: boolean }) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.isActive = user.isActive;
  }
}
