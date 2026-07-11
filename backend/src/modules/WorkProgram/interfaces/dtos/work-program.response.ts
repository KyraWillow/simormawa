export class WorkProgramResponseDto {
    id: string;
    name:string;
    description: string;
    status: string;
    picId: string;
    deadline: Date;

    constructor(workProgram: {id: string, name: string, description: string, status: string, picId: string, deadline: Date}) {
        this.id = workProgram.id
        this.name =workProgram.name
        this.description = workProgram.description
        this.status = workProgram.status
        this.picId = workProgram.picId
        this.deadline = workProgram.deadline
    }
}