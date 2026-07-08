import { type } from "os";
import { AggregateRoot } from "./aggregate-root.base";

enum Role {
    BPH,
    Kadiv,
    Staff,
    Bendahara,
    Sekretaris,
    Admin
}

interface UserProps {
    email: string,
    password: string,
    role: Role,
    name: string,
    isActive: boolean
}

class userEntity extends AggregateRoot<UserProps> {

    constructor(user: UserProps, userId: string) {
        super(user, userId)
    }

    validate(): void {

        if (!this.props.email) {
            throw new Error("Invalid Email!")
        }

        if (!Object.values(Role).includes(this.props.role)) {
            throw new Error("Invalid Role!")
        }

        if (!this.props.name) {
            throw new Error("Invalid name!")
        }

        if (this.props.isActive !== true || false) {
            throw new Error("Invalid type isActive!")
        }
    }

}