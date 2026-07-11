import { Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../../ports/work-program.repository.port";
import { DashboardWorkProgramQuery } from "./dashboard-work-program.query";

@Injectable()
export class DashBoardWorkProgramHandler {
    constructor(private workProgramRepo: WorkProgramRepository) {}

    async execute(query: DashboardWorkProgramQuery){
        const workProgramActive = await this.workProgramRepo.findAllActive(query.isActive)

        return workProgramActive.length
    }
}