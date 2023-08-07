import { Controller, Post, Body, Res, HttpStatus, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Response } from 'express';


@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) { }

  // tạo profile
  @Post("/save")
  async insertProfile(@Body() detaiProfile: ProfileType, @Res() response: Response): Promise<any> {
    const profile = await this.profileService.insertProfile(detaiProfile)
    return response.status(HttpStatus.CREATED).json({
      dataProfile: profile,
      message: "Lưu thành công"
    })
  }
  // đếm frofile
  @Get("count")
  async count(): Promise<any> {
    return await this.profileService.countProfile()
  }


  @Get("users")
  async pagination(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
    @Query("email") email: string
  ): Promise<any> {
    console.log(email)
    console.log(page)
    console.log(limit)
    return await this.profileService.paginationUser(page, limit,email)
  }
}
