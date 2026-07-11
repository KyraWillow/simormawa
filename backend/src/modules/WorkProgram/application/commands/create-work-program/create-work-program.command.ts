import { WorkProgramStatus } from "../../../domain/work-program.entity";

export class CreateWorkProgramCommand {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly status: WorkProgramStatus,
        public readonly picId: string,
        public readonly deadline: Date
    ) { }
}