export abstract class WorkProgramError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

export class WorkProgramNotFoundError extends WorkProgramError {
    constructor(workProgram: string) {
        super(`Work Program ${workProgram} not Found`)
    }
}

export class InvalidStatusTransitionError extends WorkProgramError {
    constructor(workProgramStatus: string) {
        super(`Invalid Status ${workProgramStatus} Work Program`)
    }
}

export class WorkProgramAlreadyCompletedError extends WorkProgramError {
    constructor(workProgramStatus: string) {
        super(`Work Program ${workProgramStatus} Already Completed`)
    }
}