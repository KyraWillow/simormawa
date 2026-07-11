import { Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../../ports/work-program.repository.port";
import { UpdateStatusWorkProgramCommand } from "./update-status-work-program.command";
import { WorkProgramNotFoundError } from "src/modules/WorkProgram/domain/work-program.errors";


@Injectable()
export class UpdateStatusWorkProgramService {
    constructor(private workProgramRepo: WorkProgramRepository) {}

    async execute(command: UpdateStatusWorkProgramCommand) {
        const workProgam = await this.workProgramRepo.findById(command.id)

        if(!workProgam) {
            throw new WorkProgramNotFoundError(command.id)
        }

        workProgam.updateStatus(command.status)
        this.workProgramRepo.save(workProgam)
    }
}