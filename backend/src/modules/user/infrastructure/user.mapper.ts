import { Role, UserEntity } from "../domain/user.entity";
import { UserPersistenceModel } from "./user.persistence"; 

export class UserMapper {
    toDomain(row: UserPersistenceModel): UserEntity {
        const role = row.role as Role

        const props = {email: row.email, password: row.password, name: row.name, role: role, isActive: row.is_active}

        return UserEntity.fromPersistence(row.id, props)
    }

    toPersistence(entity: UserEntity): UserPersistenceModel {
        const password = entity.getPasswordForPersistence()

        return {
            id: entity.id,
            email: entity.email,
            name: entity.name,
            role: entity.role,
            is_active: entity.isActive,
            password: password,
            created_at: new Date(),
             updated_at: new Date()
        }
    }
}