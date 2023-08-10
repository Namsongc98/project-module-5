import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entity/Status';
import { Repository } from 'typeorm';
import { TopicService } from '../topic/topic.service';
import { Topic } from '../topic/entity/topic';
@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private repoStatus: Repository<Status>,
        private topicService: TopicService
    ) { }
    // update login
    async updateUser(idUser): Promise<any> {
        const dataTopic = await this.topicService.selectAll()
        const dataStatus = await this.repoStatus.find({
            where: {
                userId: idUser
            }
        })

        try {
            // hàm tạo mới Status
            const handleCreate = async (topics: Topic[]) => {
                topics.map(async (topic) => {
                    const newstatus = new Status()
                    newstatus.userId = idUser;
                    newstatus.topicId = topic.id;
                    return await this.repoStatus.save(newstatus)
                })
            }
            if (dataStatus.length === 0) {
                handleCreate(dataTopic)
            } else if (dataTopic.length <= dataStatus.length) {
                dataStatus.map(async (status) => {
                    const newstatus = await this.repoStatus.create({
                        ...status,
                        userId: idUser,
                        topicId: status.topicId
                    })
                    return await this.repoStatus.save(newstatus)
                })
            } else if (dataTopic.length > dataStatus.length) {
                const result = dataTopic.filter(topic => !dataStatus.some(status => status.topicId === topic.id))
                handleCreate(result)
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async getTopic(idUser: string): Promise<any> {
        try {
            const result = await this.repoStatus
                .createQueryBuilder("status")
                .select("*")
                .innerJoin("status.topic", "topic")
                .where("status.userId = :id", { id: idUser })
                .getRawMany()
            return result
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
