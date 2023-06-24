import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

 
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateCreated: Date;

  @IsNotEmpty()
  userId: number;
  
}