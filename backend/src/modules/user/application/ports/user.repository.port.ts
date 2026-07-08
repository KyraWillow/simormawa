import { UserEntity } from "../../domain/user.entity";


export interface UserRepository {
    findByEmail(email:string): Promise<UserEntity | null>
    save(user: UserEntity): Promise<UserEntity>
    findById(id: string): Promise<UserEntity | null>
    findAll(): Promise<UserEntity[]>
}