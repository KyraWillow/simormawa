import { WorkProgramEntity, WorkProgramStatus } from '../domain/work-program.entity';
import { WorkProgramPersistenceModel } from './work-program.persistence';

export class WorkProgramMapper {
  toDomain(row: WorkProgramPersistenceModel): WorkProgramEntity {
    const status = row.status as WorkProgramStatus;

    const props = {
      name: row.name,
      description: row.description,
      status,
      picId: row.pic_id,
      deadline: new Date(row.deadline),
    };

    return WorkProgramEntity.fromPersistence(row.id, props);
  }

  toPersistence(entity: WorkProgramEntity): WorkProgramPersistenceModel {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      status: entity.status,
      pic_id: entity.picId,
      deadline: entity.deadline,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
