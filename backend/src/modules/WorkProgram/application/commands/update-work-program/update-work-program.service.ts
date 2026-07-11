import { Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../../ports/work-program.repository.port";
import { WorkProgramNotFoundError } from "src/modules/WorkProgram/domain/work-program.errors";
import { UpdateWorkProgramCommand } from "./update-work-program.command";


@Injectable()
export class UpdateWorkProgramService {
    constructor(private workProgramRepo: WorkProgramRepository) {}

    async execute(command: UpdateWorkProgramCommand): Promise<void> {
        const workProgram = await this.workProgramRepo.findById(command.id)

        if (!workProgram) {
            throw new WorkProgramNotFoundError(command.id)
        }

        workProgram.updateDetail(command.name, command.description, command.picId, command.deadlien)
        await this.workProgramRepo.save(workProgram)
    }
}