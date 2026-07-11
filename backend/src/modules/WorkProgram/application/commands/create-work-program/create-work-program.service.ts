import { Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../../ports/work-program.repository.port";
import { CreateWorkProgramCommand } from "./create-work-program.command";
import { randomUUID } from "crypto";
import { WorkProgramEntity } from "../../../domain/work-program.entity";


@Injectable()
export class CreateWorkProgramService {
    constructor(private workProgramRepo: WorkProgramRepository) { }

    async execute(command: CreateWorkProgramCommand): Promise<string> {

        const id = randomUUID()
        const workProgam = WorkProgramEntity.create(id, command.name, command.description, command.picId, command.deadline)
        await this.workProgramRepo.save(workProgam)
        return id
    }
}