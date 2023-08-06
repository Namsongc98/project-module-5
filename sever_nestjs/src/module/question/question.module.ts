import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question';
import { Topic } from '../topic/entity/topic';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Topic])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule { }
