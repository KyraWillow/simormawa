import { Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../../ports/work-program.repository.port";
import { FindByIdWorkProgramQuery } from "./find-by-id-work-program.query";
import { WorkProgramNotFoundError } from "src/modules/WorkProgram/domain/work-program.errors";

@Injectable()
export class FindByIdWorkProgramHandler {
    constructor(private workProgramRepo: WorkProgramRepository){}

    async execute(query: FindByIdWorkProgramQuery) {
        const workProgram = await this.workProgramRepo.findById(query.id)

        if(!workProgram) {
            throw new WorkProgramNotFoundError(query.id)
        }

        return workProgram
    }
}