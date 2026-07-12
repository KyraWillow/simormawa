export class SubmitEvaluationCommand {
  constructor(
    public readonly id: string,
    public readonly kesimpulan: string,
    public readonly rekomendasi: string,
  ) {}
}
