import { Inject, Injectable } from "@nestjs/common";
import { WorkProgramRepository } from "../application/ports/work-program.repository.port";
import type { Pool } from "mariadb";
import { WorkProgramMapper } from "./work-program.mapper";
import { WorkProgramEntity } from "../domain/work-program.entity";

@Injectable()
export class WorkProgramRepositoryImpl implements WorkProgramRepository {
    constructor(
        @Inject('DATABASE_CONNECTION') private readonly pool: Pool,
        private readonly mapper: WorkProgramMapper) { }

    async findById(id: string): Promise<WorkProgramEntity | null> {
        const conn = await this.pool.getConnection()
        try {
            const rows = await conn.query('SELECT * FROM work_programs WHERE id = ?', [id])
            if (!rows[0]) return null
            return this.mapper.toDomain(rows[0])
        } finally {
            conn.release()
        }
    }

    async findByPicId(picId: string): Promise<WorkProgramEntity | null> {
        const conn = await this.pool.getConnection()
        try {
            const rows = await conn.query('SELECT * FROM work_programs WHERE pic_id = ?', [picId])
            if (!rows[0]) return null;
            return this.mapper.toDomain(rows[0])
        } finally {
            conn.release()
        }
    }

    async findAll(): Promise<WorkProgramEntity[]> {
        const conn = await this.pool.getConnection()
        try {
            const rows = await conn.query('SELECT * work_programs')
            return rows.map((rows: any) => this.mapper.toDomain(rows))
        } finally {
            conn.release()
        }
    }

    async findAllActive(isActive: boolean): Promise<WorkProgramEntity[]> {
        const conn = await this.pool.getConnection()
        try {
            const rows = await conn.query('SELECT * FROM work_programs WHERE is_active = ?', [isActive])
            return rows.map((rows: any) => this.mapper.toDomain(rows))
        } finally {
            conn.release()
        }
    }

    async save(workProgram: WorkProgramEntity): Promise<WorkProgramEntity> {
        const exiting = await this.findById(workProgram.id)
        const conn = await this.pool.getConnection()
        try {
            if (!exiting) {
                await conn.query('UPDATE work_programs SET name = ?, description = ?, status = ?, pic_id = ?, deadline = ? WHERE id = ?', [
                    workProgram.name,
                    workProgram.description,
                    workProgram.status,
                    workProgram.picId,
                    workProgram.deadline,
                    workProgram.id
                ])
            } else {
                await conn.query('INSERT INTO work_programs (id, name, description, status, picId, deadline) VALUES (?, ?, ?, ?, ?, ?)', [
                    workProgram.id,
                    workProgram.name,
                    workProgram.description,
                    workProgram.status,
                    workProgram.picId,
                    workProgram.deadline
                ])
            }
            return workProgram
        } finally { 
            conn.release()
        }
    }
}