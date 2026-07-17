import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Response } from 'express';
import { UploadDocumentService } from '../../application/commands/upload-document/upload-document.service';
import { UploadDocumentCommand } from '../../application/commands/upload-document/upload-document.command';
import { FindDocumentsHandler } from '../../application/queries/find-documents/find-documents.handler';
import { FindDocumentsQuery } from '../../application/queries/find-documents/find-documents.query';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('documents')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.KADIV, Role.PIC_STAFF, Role.SEKRETARIS, Role.ADMIN)
export class DocumentController {
  constructor(
    private readonly uploadSvc: UploadDocumentService,
    private readonly findH: FindDocumentsHandler,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const cmd = new UploadDocumentCommand(
      body.workProgramId,
      body.uploadedBy,
      body.type || 'lainnya',
      file.originalname,
      file.path,
      file.size,
    );
    const id = await this.uploadSvc.execute(cmd);
    return { id, fileName: file.originalname };
  }

  @Get('by-work-program/:wpId')
  async findByWp(@Param('wpId') wpId: string) {
    const items = await this.findH.execute(new FindDocumentsQuery(wpId));
    return items.map((i: any) => ({
      id: i.id,
      type: i.type,
      fileName: i.fileName,
      fileSize: i.fileSize,
      uploadedBy: i.uploadedBy,
    }));
  }

  @Get('download/:id')
  async download(@Param('id') id: string, @Res() res: Response) {
    const items = await this.findH.execute(new FindDocumentsQuery(''));
    const doc = items.find((i: any) => i.id === id);
    if (!doc) { res.status(404).json({ message: 'Dokumen tidak ditemukan' }); return; }
    res.download(doc.filePath, doc.fileName);
  }
}
