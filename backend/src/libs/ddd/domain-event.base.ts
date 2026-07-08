export abstract class DomainEvent<T> {
    constructor(public readonly aggregateId: string, public readonly payload: T) {}

    public readonly occurredOn: Date = new Date();
    public readonly eventName: string = this.constructor.name;
}