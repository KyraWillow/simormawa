import { DomainEvent } from "./domain-event.base";

export abstract class AggregateRoot<T> {
    constructor(public props: T, public readonly id: string) {

        this.validate()
    }

    private _domainEvents: DomainEvent<unknown>[] = [];

    abstract validate(): void;

    addDomainEvent(event: DomainEvent<unknown>) {
        this._domainEvents.push(event);
    }

    pullDomainEvents() {
        let domain = this._domainEvents;
        this._domainEvents = [];
        return domain;
    }
}