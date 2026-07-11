import { WorkProgramStatus } from "src/modules/WorkProgram/domain/work-program.entity";

export class UpdateStatusWorkProgramCommand {
    constructor(
        public readonly id: string,
        public readonly status: WorkProgramStatus
    ){}
}