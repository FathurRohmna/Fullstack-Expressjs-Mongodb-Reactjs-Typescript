import { IsString, IsOptional, IsBoolean } from 'class-validator';

export interface UpdateArticleDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsBoolean()
  @IsOptional()
  paid: boolean;

  @IsString()
  @IsOptional()
  category: string;
}