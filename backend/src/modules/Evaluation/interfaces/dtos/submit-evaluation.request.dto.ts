import { IsString } from 'class-validator';

export class SubmitEvaluationRequestDto {
  @IsString() kesimpulan: string;
  @IsString() rekomendasi: string;
}
