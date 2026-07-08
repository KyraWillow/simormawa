import { DomainEvent } from "src/libs/ddd/domain-event.base";
import { Role } from "../user.entity";

export interface EventProps {
    email: string,
    name: string,
    role: Role
}

export class UserCreatedEvent extends DomainEvent<EventProps> {
    constructor(aggregateId: string, payload: EventProps) {
        super(aggregateId, payload)
    }
}