import { UserEntity } from "../user.entity";


interface UserRepository {
    findByEmail(email:string): Promise<UserEntity | null>
    save(user: string): Promise<UserEntity>
    findById(id: string): Promise<UserEntity | null>
    findAll(): Promise<UserEntity[]>
}