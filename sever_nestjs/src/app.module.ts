import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { UsersModule } from './module/users/users.module';
import { EvaluateModule } from './module/evaluate/evaluate.module';
import { TopicModule } from './module/topic/topic.module';
import { AuthModule } from './module/auth/auth.module';
import entities from"./typeorm/index"
import { AuthService } from './module/auth/auth.service';
import { AuthController } from './module/auth/auth.controller';
import { ProfileModule } from './module/profile/profile.module';
import { QuestionModule } from './module/question/question.module';
import { StatusModule } from './module/status/status.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port:3306,
    username: "root",
    password: "12345678",
    database:"modules_5",
    entities,
    synchronize:true,
    logging: true
  }), UsersModule, EvaluateModule, TopicModule, AuthModule, ProfileModule, QuestionModule, StatusModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
