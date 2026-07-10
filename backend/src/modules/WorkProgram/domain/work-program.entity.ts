import { AggregateRoot } from "src/libs/ddd/aggregate-root.base";
import { WorkProgramCreatedEvent } from "./event/work-program-created.event";

export enum WorkProgramStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ON_HOLD = "ON_HOLD"
}

export interface WorkProgramProps {
    name: string,
    description: string,
    status: WorkProgramStatus,
    picId: string,
    deadline: Date
}

export class WorkProgramEntity extends AggregateRoot<WorkProgramProps> {
    private constructor(workProgams: WorkProgramProps, id: string) {
        super(workProgams, id)
    }

    public static create(id: string, name: string, description: string, picId: string, deadline: Date): WorkProgramEntity {
        const workProgramData = new WorkProgramEntity(
            { name, description, status: WorkProgramStatus.NOT_STARTED, picId, deadline },
            id
        )

        workProgramData.addDomainEvent(
            new WorkProgramCreatedEvent(id, {name, picId, deadline})
        )

        return workProgramData;
    }


    public get name(): string {
        return this.props.name
    }

    public get description(): string {
        return this.props.description
    }


    public get status(): WorkProgramStatus {
        return this.props.status
    }


    public get picId(): string {
        return this.props.picId
    }


    public get deadline(): Date {
        return this.props.deadline
    }


    validate(): void {
        if (!Object.values(WorkProgramStatus).includes(this.props.status)) {
            throw new Error("Invalid Work Program Status!")
        }

        if (!this.props.name) {
            throw new Error("Names should not be empty!")
        }

        if (!this.props.description) {
            throw new Error("Description should not be empty!")
        }

        if (!this.props.picId) {
            throw new Error("PIC ID should not be empty!")
        }

        if (!this.props.deadline) {
            throw new Error("Deadline should not be empty!")
        }
    }

    private static readonly StatusRules: Record<WorkProgramStatus, WorkProgramStatus[]> = {
        [WorkProgramStatus.NOT_STARTED]: [WorkProgramStatus.IN_PROGRESS, WorkProgramStatus.ON_HOLD],
        [WorkProgramStatus.IN_PROGRESS]: [WorkProgramStatus.ON_HOLD, WorkProgramStatus.COMPLETED],
        [WorkProgramStatus.ON_HOLD]: [WorkProgramStatus.IN_PROGRESS],
        [WorkProgramStatus.COMPLETED]: []
    }


    public updateStatus(next: WorkProgramStatus) {
        const allowed = WorkProgramEntity.StatusRules[this.props.status]

        if (!allowed.includes(next)) {
            throw new Error("Transition Invalid")
        }

        this.props.status = next
    }

    public assignPIC(picId: string): void {
        this.props.picId = picId;
    }

    public updateDetail(name: string, description: string, deadline: Date): void {
        this.props.name = name
        this.props.description = description
        this.props.deadline = deadline
        this.validate()
    }

    static fromPersistence(id: string, props: WorkProgramProps): WorkProgramEntity {
        return new WorkProgramEntity(props, id)
    }
}