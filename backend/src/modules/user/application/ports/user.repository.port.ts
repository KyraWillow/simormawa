import { UserEntity } from '../../domain/user.entity';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract save(user: UserEntity): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract delete(id: string): Promise<void>;
}
