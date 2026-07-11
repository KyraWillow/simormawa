import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateWorkProgramRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  picId: string;

  @IsDateString()
  deadline: string;
}
