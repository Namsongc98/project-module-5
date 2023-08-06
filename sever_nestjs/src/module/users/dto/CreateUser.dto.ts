import { ValidationError } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty({message:"Email không được để trống"})
  @IsEmail({},{message:"Nhập đúng định dạng Email"})
  email: string;

  @IsString()
  @IsNotEmpty({message:"Password không được để trống"})
  @Length(6,20,{message: "Mật khẩu không dưới 6 - 20 kí tự"})
  password: string;
}











