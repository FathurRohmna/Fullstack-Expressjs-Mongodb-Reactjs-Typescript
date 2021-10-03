import { IsString, IsNumber } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  firstName?: string

  @IsString()
  lastName?: string

  @IsString()
  email?: string

  @IsNumber()
  permissionFlags?: number
}