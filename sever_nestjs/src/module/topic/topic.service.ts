import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Topic } from './entity/topic';
import { InjectRepository } from '@nestjs/typeorm';
import { topicType } from './type/TypeTopic';

@Injectable()
export class TopicService {

    constructor(
        @InjectRepository(Topic)
        private topicRepository: Repository<Topic>) { }
    // Thêm chủ đề
    async insertTopic(insertTopic: topicType): Promise<any> {
        try {
            const newTopic = new Topic()
            Object.assign(newTopic, insertTopic)
            return await this.topicRepository.save(newTopic)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // lấy dữ liệu begin
    async selectBeginner(): Promise<Topic[]> {
        try {
            const result = await this.topicRepository.find({
                where: {
                    lever: "Sơ cấp",
                }
            })
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    // lấy dữ liệu trung cấp
    async selectIntermediate(): Promise<Topic[]> {
        try {
            const result = await this.topicRepository.find({
                where: {
                    lever: "Trung cấp",
                }
            })
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    //lấy dữ liệu cao cấp
    async selectAdvanced(): Promise<Topic[]> {
        try {
            const result = await this.topicRepository.find({
                where: {
                    lever: "Cao cấp",
                }
            })
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    // get all Chủ đề
    async selectAll(): Promise<Topic[]> {
        try {
            return await this.topicRepository.find()
        } catch (error) {
            throw new Error(error)
        }
    }

    // Updeate chủ đề
    async updateTopic(updateTopic: topicType): Promise<topicType> {
        try {
            const topic = new Topic()
            Object.assign(topic, updateTopic)
            return await this.topicRepository.save(topic)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // xóa chủ đề
    async delete(id: number): Promise<any> {
        try {
            const findId = await this.topicRepository.findOneBy({ id: id })
            if (!findId) throw new NotFoundException("Không tìm thấy chủ đề này ")
            return await this.topicRepository.delete(id)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // search topic 
    async selectTopic(name: string): Promise<any> {
        try {
            const topic = await this.topicRepository
                .createQueryBuilder("topic")
                .select(['name'])
                .addSelect([`question.question,
                            question.id,
                            question.option_a,
                            question.option_b,
                            question.option_c,
                            question.option_d,
                            question.answer`])
                .innerJoin("topic.questions", "question")
                .where("topic.name like :name", { name: `%${name}%` })
                .getRawMany();
            return topic
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

   

}
