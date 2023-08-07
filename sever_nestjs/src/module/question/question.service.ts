import { Topic } from './../topic/entity/topic';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/question';
import { TypeQuestion, TypeTopicQuestion } from './type/questionType';


@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Topic)
        private topicRepository: Repository<Topic>
    ) { }

    // data câu hỏi 
    async selectAll(): Promise<any> {
        return await this.questionRepository
            .createQueryBuilder("question")
            .select(["question.*"])
            .addSelect(["name"])
            .innerJoin("question.topic", "topic")
            .getRawMany();
    }

    async paginatequestion(page, limit): Promise<any> {
        console.log(page, limit)
    }

    // lấy câu hỏi theo id
    async selectQuestion(id: number): Promise<TypeTopicQuestion> {
        try {
            const topic = await this.topicRepository.findOneBy({ id })
            const question = await this.questionRepository.findBy({ topicId: id })
            const count = await this.questionRepository.count({ where: { topicId: id } })
            return {
                topic,
                question,
                count
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // thêm câu hỏi 
    async insertQuestion(detailquestion: TypeQuestion): Promise<any> {
        try {
            const newQuestion = await this.questionRepository.create({
                question: detailquestion.question,
                option_a: detailquestion.optionA,
                option_b: detailquestion.optionB,
                option_c: detailquestion.optionC,
                option_d: detailquestion.optionD,
                answer: detailquestion.answer,
                topicId: detailquestion.idTopic,
            })
            await this.questionRepository.save(newQuestion)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // sửa câu hỏi
    async updateQuestion(detailquestion: TypeQuestion) {
        try {
            if (!detailquestion.idQuestion) throw new NotFoundException("Không tìm thấy câu hỏi")
            const newQuestion = await this.questionRepository.create({
                question: detailquestion.question,
                option_a: detailquestion.optionA,
                option_b: detailquestion.optionB,
                option_c: detailquestion.optionC,
                option_d: detailquestion.optionD,
                answer: detailquestion.answer,
            })
            return await this.questionRepository.update(detailquestion.idQuestion, newQuestion)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // Xóa câu hỏi
    async deleteQuestion(id: number): Promise<any> {
        try {
            if (!id) throw new NotFoundException("Không tìm thấy câu hỏi này ")
            await this.questionRepository.delete(id)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // đếm câu hỏi
    async countQuestion(): Promise<number> {
        try {
            return this.questionRepository.count()
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
