import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller('kak')
export class KakController {
  @Get('template')
  downloadTemplate(@Res() res: Response) {
    const filePath = join(process.cwd(), 'assets', 'Format KAK Departemen.pdf');
    res.download(filePath, 'Template_KAK.pdf');
  }
}
