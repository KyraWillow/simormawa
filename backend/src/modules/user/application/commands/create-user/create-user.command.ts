import { Role } from "src/modules/user/domain/user.entity";

export class CreateUserCommand {

    constructor(public readonly email: string, public readonly name: string, public readonly role: Role, public readonly password: string) { }

}