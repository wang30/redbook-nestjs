import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ArrayMaxSize,
} from 'class-validator';

export class CreateNoteDTO {
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsNotEmpty()
  @Length(1, 2000)
  content: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(9)
  @IsString({ each: true })
  imageUrls?: string[];
}
