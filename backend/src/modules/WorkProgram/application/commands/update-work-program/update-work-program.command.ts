export class UpdateWorkProgramCommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly picId: string,
        public readonly deadlien: Date
    ){}
}