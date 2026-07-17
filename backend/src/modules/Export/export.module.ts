import { Module } from '@nestjs/common';
import { ExportController } from './interfaces/controllers/export.controller';
import { ExportService } from './application/services/export.service';

@Module({
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
