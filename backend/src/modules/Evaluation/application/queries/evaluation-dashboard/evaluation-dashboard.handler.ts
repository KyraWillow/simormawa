import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../ports/evaluation.repository.port';
import { EvaluationDashboardQuery } from './evaluation-dashboard.query';
import { EvaluationStatus } from '../../../domain/evaluation.entity';

@Injectable()
export class EvaluationDashboardHandler {
  constructor(private readonly repo: EvaluationRepository) {}

  async execute(_query: EvaluationDashboardQuery) {
    const all = await this.repo.findAll();
    const submitted = all.filter((e) => e.status === EvaluationStatus.SUBMITTED);
    const avgScore = this.calcAvg(submitted);
    return {
      total: all.length,
      submitted: submitted.length,
      draft: all.length - submitted.length,
      averageScore: avgScore,
      scoreDistribution: this.scoreDistribution(submitted),
    };
  }

  private calcAvg(entities: any[]): number {
    if (entities.length === 0) return 0;
    const allScores = entities.flatMap((e) => e.indicators.map((i: any) => i.score));
    return +(allScores.reduce((a: number, b: number) => a + b, 0) / allScores.length).toFixed(2);
  }

  private scoreDistribution(entities: any[]) {
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const e of entities) {
      for (const ind of e.indicators) {
        const s = Number(ind.score);
        if (dist[s] !== undefined) dist[s]++;
      }
    }
    return dist;
  }
}
