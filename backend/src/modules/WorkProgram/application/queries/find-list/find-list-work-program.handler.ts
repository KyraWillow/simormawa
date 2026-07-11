import { Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../../ports/work-program.repository.port";
import { FindListWorkProgramQuery } from "./find-list-work-program.query";

@Injectable()
export class FindListWorkProgramHandler {
    constructor(private workProgramRepo: WorkProgramRepository){}

    async execute(query: FindListWorkProgramQuery) {
        const workProgram = await this.workProgramRepo.findAll()
        return workProgram
    }
}