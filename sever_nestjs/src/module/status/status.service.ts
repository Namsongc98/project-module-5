import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entity/Status';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {

    constructor(
        @InjectRepository(Status)
        private repoStatus: Repository<Status>
    ) { }

    async updateUser(id): Promise<any> {
        const findStatus = await this.repoStatus.findOne({
            where: {
                userId: id
            }
        })
        if (findStatus) return
        try {
            
            const newStatus = await this.repoStatus.create({
                userId: id
            })
            await this.repoStatus.save(newStatus)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
