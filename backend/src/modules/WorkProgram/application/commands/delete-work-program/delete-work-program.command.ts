import { WorkProgramStatus } from "src/modules/WorkProgram/domain/work-program.entity";

export class DeleteWorkProgramCommand {
    constructor(
        public readonly id: string,
        public readonly status: WorkProgramStatus
    ){}
}