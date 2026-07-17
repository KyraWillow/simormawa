import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';
export class CreateReportRequestDto {
  @IsString() workProgramId: string;
  @IsString() submittedBy: string;
  @IsNumber() @Min(0) @Max(100) progressPct: number;
  @IsString() @MinLength(10) description: string;
  @IsString() obstacles?: string;
}
