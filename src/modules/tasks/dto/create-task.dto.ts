import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  isNumber,
} from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  // @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateStart?: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateEnd?: Date;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
