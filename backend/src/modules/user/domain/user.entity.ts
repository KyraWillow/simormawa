import { AggregateRoot } from "../../../libs/ddd/aggregate-root.base";
import { UserCreatedEvent } from "./events/user-created.event";

export enum Role {
    BPH = 'BPH',
    KADIV = 'KADIV',
    PIC_STAFF = 'PIC/STAFF',
    BENDAHARA = 'BENDAHARA',
    SEKRETARIS = 'SEKRETARIS',
    ADMIN = 'ADMIN'
}

export interface UserProps {
    email: string,
    password: string,
    role: Role,
    name: string,
    isActive: boolean
}

export class UserEntity extends AggregateRoot<UserProps> {

    private constructor(user: UserProps, id: string) {
        super(user, id)
    }

    get email(): string{return this.props.email}
    get name(): string{return this.props.name}
    get role(): string{return this.props.role}
    get isActive(): boolean{return this.props.isActive}

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

        if (typeof this.props.isActive !== 'boolean') {
            throw new Error("Invalid type isActive!")
        }

        if(this.props.password.length < 12) {
            throw new Error("Minimum 12 Character!")
        }
    }


    public static create(id: string, email: string, name: string, role: Role, password: string): UserEntity {

        const userData = new UserEntity({ email, name, role, password, isActive: true }, id);
        
        userData.addDomainEvent(
            new UserCreatedEvent(id, {email, name, role})
        );

        return userData;
    }

    public deactivate(): void {
        this.props.isActive = false
    }
}