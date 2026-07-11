export class CreateWorkProgramCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly picId: string,
    public readonly deadline: Date,
  ) {}
}
