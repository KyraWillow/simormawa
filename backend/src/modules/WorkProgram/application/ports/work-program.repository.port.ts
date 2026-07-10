import { WorkProgramEntity } from "../../domain/work-program.entity";

export abstract class WorkProgramRepository {
    abstract save(workProrgram: WorkProgramEntity): Promise<WorkProgramEntity>
    abstract findById(id: string): Promise<WorkProgramEntity | null>
    abstract findByPicId(picId: string): Promise<WorkProgramEntity | null>
    abstract findAll(): Promise<WorkProgramEntity[]>
    abstract findAllActive(isActive: boolean): Promise<WorkProgramEntity[]>
}