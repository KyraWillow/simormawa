import { Module } from '@nestjs/common';
import { KakController } from './kak.controller';

@Module({
  controllers: [KakController],
})
export class KakModule {}
