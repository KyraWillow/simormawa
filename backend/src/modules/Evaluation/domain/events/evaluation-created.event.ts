import { DomainEvent } from '../../../../libs/ddd/domain-event.base';

interface EvaluationCreatedPayload {
  workProgramId: string;
  evaluatedBy: string;
}

export class EvaluationCreatedEvent extends DomainEvent<EvaluationCreatedPayload> {
  constructor(aggregateId: string, payload: EvaluationCreatedPayload) {
    super(aggregateId, payload);
  }
}
