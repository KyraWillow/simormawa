import { EvaluationIndicatorProps } from '../../../domain/evaluation.entity';

export class CreateEvaluationCommand {
  constructor(
    public readonly workProgramId: string,
    public readonly evaluatedBy: string,
    public readonly indicators: EvaluationIndicatorProps[],
  ) {}
}
