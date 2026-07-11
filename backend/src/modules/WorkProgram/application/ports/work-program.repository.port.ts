import { WorkProgramEntity } from '../../domain/work-program.entity';

export abstract class WorkProgramRepository {
  abstract save(entity: WorkProgramEntity): Promise<WorkProgramEntity>;
  abstract findById(id: string): Promise<WorkProgramEntity | null>;
  abstract findByPicId(picId: string): Promise<WorkProgramEntity[]>;
  abstract findAll(): Promise<WorkProgramEntity[]>;
  abstract findAllActive(): Promise<WorkProgramEntity[]>;
  abstract delete(id: string): Promise<void>;
}
