import { Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../../ports/work-program.repository.port";
import { AssignPicCommand } from "./assign-pic-work-program.command";


@Injectable()
export class AssignPicService {
    constructor(private workProgramRepo: WorkProgramRepository) {}

    async execute(command: AssignPicCommand) {
        const picId = await this.workProgramRepo.findByPicId(command.picId)

        if(!picId) {
            throw new Error(`Invalid ${picId}`)
        }

        picId.assignPIC(command.picId)
        this.workProgramRepo.save(picId)
    }
}