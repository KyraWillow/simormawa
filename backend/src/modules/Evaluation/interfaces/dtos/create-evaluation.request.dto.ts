import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class IndicatorDto {
  @IsString() indicatorName: string;
  @IsString() target: string;
  @IsString() realisasi: string;
  @IsNumber() @Min(1) @Max(5) score: number;
  @IsOptional() @IsString() notes?: string;
}

export class CreateEvaluationRequestDto {
  @IsString() workProgramId: string;
  @IsString() evaluatedBy: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => IndicatorDto)
  indicators: IndicatorDto[];
}
