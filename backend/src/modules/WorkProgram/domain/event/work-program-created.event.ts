import { DomainEvent } from "src/libs/ddd/domain-event.base";


interface EventPayload{
    name: string,
    picId: string,
    deadline: Date
}

export class WorkProgramCreatedEvent extends DomainEvent<EventPayload> {
    constructor(aggregateId: string, payload: EventPayload) {
        super(aggregateId, payload)
    }
}