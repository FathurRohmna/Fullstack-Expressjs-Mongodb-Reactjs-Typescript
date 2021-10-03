import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsBoolean()
  @IsNotEmpty()
  paid: boolean;

  @IsString()
  @IsNotEmpty()
  categories: string[];
}