import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
