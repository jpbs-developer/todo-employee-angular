import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDTO {
  @IsString()
  name: string;
  @IsString()
  jobRole: string;
  @IsNumber()
  salary: number;
  @IsDateString()
  birthDate: Date;
  @IsNumber()
  registry: number;
}
