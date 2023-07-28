import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @Type(() => Date)
  // @IsDate()
  @IsNotEmpty()
  dateCreated: string;

  @IsNotEmpty()
  userId: number;
}
