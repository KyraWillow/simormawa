import { Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../../ports/work-program.repository.port";
import { DeleteWorkProgramCommand } from "./delete-work-program.command";
import { WorkProgramNotFoundError } from "src/modules/WorkProgram/domain/work-program.errors";


@Injectable()
export class DeleteWorkProgramService {
    constructor(private workProgramRepo: WorkProgramRepository) {}

    async execute(command: DeleteWorkProgramCommand) {
        const workProgram = await this.workProgramRepo.findById(command.id)

        if(!workProgram) {
            throw new WorkProgramNotFoundError(command.id)
        }

        if (command.status != 'COMPLETED') {
            // comming soon feature
        }
    }
}