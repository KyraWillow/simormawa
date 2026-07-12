import { ArrayMinSize, IsArray, IsNumber, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class IndicatorDto {
  @IsString() indicatorName: string;
  @IsString() target: string;
  @IsString() realisasi: string;
  @IsNumber() @Min(1) @Max(5) score: number;
  @IsString() notes?: string;
}

export class CreateEvaluationRequestDto {
  @IsString() workProgramId: string;
  @IsString() evaluatedBy: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => IndicatorDto)
  indicators: IndicatorDto[];
}
