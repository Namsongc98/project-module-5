import { QuestionService } from './../question/question.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entity/Status';
import { Repository } from 'typeorm';
import { TopicService } from '../topic/topic.service';
import { Topic } from '../topic/entity/topic';
import { TypeStatus } from './type/statusType';
@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private repoStatus: Repository<Status>,
        private topicService: TopicService,
        private questionService: QuestionService

    ) { }
    // update login
    async updateUser(idUser): Promise<void> {
        const dataTopic = await this.topicService.selectAll()
        const dataStatus = await this.repoStatus.find({
            where: {
                userId: idUser
            }
        })

        try {
            // hàm tạo mới Status
            const handleCreate = async (topics: Topic[]) => {
                for (let index = 0; index < topics.length; index++) {
                    const newStatus = await this.repoStatus.create({
                        userId: idUser,
                        topicId: topics[index].id
                    })
                    await this.repoStatus.save(newStatus)
                }
            }
            if (dataStatus.length === 0) {
                // tạo data  theo cho người dùng mới 
                handleCreate(dataTopic)
            } else if (dataTopic.length <= dataStatus.length) {
                //tạo update data nêu người dùng login
                dataStatus.map(async (status) => {
                    const newstatus = await this.repoStatus.create({
                        ...status,
                        userId: idUser,
                        topicId: status.topicId
                    })
                    return await this.repoStatus.save(newstatus)
                })
            } else if (dataTopic.length > dataStatus.length) {
                // thêm data topic cho người dùng 
                const addData = dataTopic.filter(topic => !dataStatus.some(status => status.topicId === topic.id))
                handleCreate(addData)
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // lấy data status topic theo id user
    async getTopic(idUser: string): Promise<any> {
        try {
            const result = await this.repoStatus
                .createQueryBuilder("status")
                .select(["status.*", "name,lever,target,image"])
                .innerJoin("status.topic", "topic")
                .where("status.userId = :id", { id: idUser })
                .getRawMany()
            return result
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // update data status khi user vượt qua các câu hỏi thuộc chủ đề 
    async updateTopic(updateStatus): Promise<void> {
        const countQuestion = await this.questionService.countQuestionTopic(updateStatus.idTopic)
        await this.repoStatus.createQueryBuilder()
            .update(Status)
            .set({
                poiter: countQuestion * 5
            })
            .where("id = :id ", { id: updateStatus.idStatus })
            .execute()
    }

    async updateNext(nextTopic): Promise<any> {
        if (nextTopic.currenLever === "Sơ cấp") {
            const lengthStatus = await this.repoStatus.count({
                where: {
                    userId: nextTopic.idUser
                }
            })

            for (let index = 0; index < lengthStatus; index++) {
                await this.repoStatus.createQueryBuilder()
                    .update(Status)
                    .set({ status_intermediate: true })
                    .where("userId = :idUser", { idUser: nextTopic.idUser })
                    .execute()
            }
        } else if (nextTopic.currenLever === "Trung cấp") {
            const lengthStatus = await this.repoStatus.count({
                where: {
                    userId: nextTopic.idUser
                }
            })
            for (let index = 0; index < lengthStatus; index++) {
                await this.repoStatus.createQueryBuilder()
                    .update(Status)
                    .set({ status_advanced: true })
                    .where("userId = :idUser", { idUser: nextTopic.idUser })
                    .execute()
            }
        }
    }

}
