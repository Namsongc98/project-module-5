import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entity/Status';
import { TopicModule } from '../topic/topic.module';
import { QuestionModule } from '../question/question.module';
@Module({
  imports: [TopicModule,QuestionModule, TypeOrmModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService]
})
export class StatusModule { }
