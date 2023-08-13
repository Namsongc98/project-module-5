import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluateService } from './evaluate.service';
import { EvaluateController } from './evaluate.controller';
import { UsersModule } from '../users/users.module';
import { Evaluate } from './entity/evaluate';
import { User } from '../users/entity/user';



@Module({
  imports: [TypeOrmModule.forFeature([Evaluate, User])],
  controllers: [EvaluateController],
  providers: [EvaluateService],
  exports: [EvaluateService]
})
export class EvaluateModule { }

