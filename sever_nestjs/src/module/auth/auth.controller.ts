import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() signInDTO: SignInDTO): Promise<any> {
    return await this.authService.signIn(signInDTO);

  }
}
