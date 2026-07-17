import { ArrayMinSize, IsArray, IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
class ItemDto { @IsString() itemName: string; @IsNumber() @Min(1) quantity: number; @IsString() unit: string; @IsNumber() @Min(0) unitPrice: number; }
export class CreateBudgetRequestDto {
  @IsString() workProgramId: string;
  @IsString() submittedBy: string;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => ItemDto) items: ItemDto[];
}
