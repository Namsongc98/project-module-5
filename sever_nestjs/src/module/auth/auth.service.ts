import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authSignIn } from './TypeAuth/TypeAuth';
import { UsersService } from '../users/users.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TopicService } from '../topic/topic.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private topicService: TopicService
  ) { }

  async signIn(authSignIn: authSignIn): Promise<any> {
    const user = await this.userService.findEmail(authSignIn);
    if (!user)
      throw new BadRequestException('Email không đúng');
    if (!user.status)
      throw new BadRequestException("Tài khoản bị khóa")

    
    // const topic = this.topicService.updateStatus(user.id)
    const profile = await this.userService.findProfile(user)

    const result = await bcrypt.compare(
      authSignIn.password,
      user.password,
    );
    if (result) {
      const payload = { sub: user.id, role: user.role };
      return {
        message: 'Thành công',
        dataUser: user,
        dataProfile: profile || "",
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }
  }
}
