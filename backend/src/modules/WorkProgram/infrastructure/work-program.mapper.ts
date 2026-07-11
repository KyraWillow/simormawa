import { WorkProgramEntity, WorkProgramStatus } from "../domain/work-program.entity";
import { WorkProgramPersistenceModel } from "./work-program.persistence";

export class WorkProgramMapper {
    toDomain(row: WorkProgramPersistenceModel): WorkProgramEntity {
        const status = row.status as WorkProgramStatus

        const props = {
            id: row.id,
            name: row.name,
            description: row.description,
            status: status,
            picId: row.picId,
            deadline: new Date(row.deadline)
        }

        return WorkProgramEntity.fromPersistence(row.id, props)
    }

    toPersistence(row: WorkProgramEntity): WorkProgramPersistenceModel {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            status: row.status,
            picId: row.picId,
            deadline: row.deadline
        }
    }
}