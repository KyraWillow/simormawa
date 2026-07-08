import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/modules/user/domain/user.entity";
import { type UserRepository } from "../../ports/user.repository.port";
import { CreateUserCommand } from "./create-user.command";
import {randomUUID} from 'crypto';


@Injectable()
export class CreateUserService {

    constructor(private readonly userRepo: UserRepository){}

    async execute(command: CreateUserCommand): Promise<string> {
        const existingUser = await this.userRepo.findByEmail(command.email)

        if(existingUser) {
            throw new Error("Email already Registered!")
        }

        const id =  randomUUID()
        const user = UserEntity.create(id, command.email, command.name, command.role, command.password)
        await this.userRepo.save(user)
        return user.id;
    }
}