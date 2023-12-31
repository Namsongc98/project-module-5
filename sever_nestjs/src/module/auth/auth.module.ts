import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './const';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TopicModule } from '../topic/topic.module';
import { StatusModule } from '../status/status.module';

@Module({
  imports: [
    UsersModule,
    StatusModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
