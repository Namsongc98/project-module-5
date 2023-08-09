import { Controller, Get, Post, Body, UseGuards, Put, Delete, Param, UseInterceptors, ClassSerializerInterceptor, SerializeOptions, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SerializeInterceptor } from './user.interceptor.ts';
import { UserDto } from './dto/User.dto';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Get()
  // @UseGuards(AuthGuard)
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  // post register
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Post('/register')
  async createUser(@Body() createUser: CreateUserDto): Promise<any> {
    const result = await this.userService.createUser(createUser);
    return result!;
  }

  // đếm người dùng
  @Get("/count")
  async countUser(): Promise<any> {
    const result = await this.userService.CountUser();
    return result;
  }
  // mở khóa người dùng
  @Put("/putlock/:id")
  async updateLock(@Param("id") idUser: string): Promise<void> {
    await this.userService.putLock(idUser)
  }

  // khóa người dùng
  @Put("/putunlock/:id")
  async updateUnlock(@Param("id") idUser: string): Promise<void> {
    await this.userService.putUnlock(idUser)
  }

  // cập nhật mật khẩu
  @Put('/updatepassword')
  async updateUser(@Body() updateUser: { id: string, password: string, newPassword: string }): Promise<any> {
    const result = await this.userService.updateUser(updateUser);
    return result!;
  }


  // get user theo id 
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/getuserid/:id')
  async getUser(@Param("id") idUser: string): Promise<any> {
    const result = await this.userService.findById(idUser);
    return result!;
  }

  // xóa người dùng 
  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<void> {
    console.log(id)
    return await this.userService.deleteUser(id)
  }
}
