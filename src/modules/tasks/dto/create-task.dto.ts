import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateStart?: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateEnd?: Date;

  @IsNotEmpty()
  taskId: number;
}

