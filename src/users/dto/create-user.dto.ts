import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 50)
  password: string;

  @IsOptional()
  avatarUrl?: string;

  @IsOptional()
  @Length(0, 200)
  bio?: string;
}
