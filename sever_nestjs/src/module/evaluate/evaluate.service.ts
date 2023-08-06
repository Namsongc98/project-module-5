import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, createQueryBuilder } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Evaluate } from './entity/evaluate';
import { User } from '../users/entity/user';



@Injectable()
export class EvaluateService {
    constructor(
        @InjectRepository(Evaluate)
        private readonly evaluateRepository: Repository<Evaluate>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }


    // tạo đánh giá
    async postEvaluate(detailEmail: EvaluateType): Promise<void> {
        console.log(detailEmail)
        const isEmail = await this.userRepository.findOne({
            where: {
                email: detailEmail.email,
            },
        });
        if (!isEmail) throw new NotFoundException(`Email ${detailEmail.email} không tồn tại`)
        try {
            const result = await this.evaluateRepository.create({
                evaluate: detailEmail.evaluate,
                rating: detailEmail.rating,
                email: detailEmail.email,
                date: detailEmail.date,
                userId: detailEmail.idUser
            } as EvaluateType)
            await this.evaluateRepository.save(result)
        } catch (error) {
            throw new Error(error);
        }
    }

    async insertLimit() {
        try {
            return await this.userRepository
                .query(`Select e.*, p.avatar,p.firstName,p.lastName  
                        from modules_5.user as u
                        join modules_5.evaluate as e on u.id = e.userId 
                        join modules_5.profile as p on u.id = p.userId
                        where rating >= 4 limit 5;`)

        } catch (error) {
            console.log(error)
        }
    }

    async countEvaluate(): Promise<number> {
        const result = await this.evaluateRepository
            .createQueryBuilder("evaluate")
            .getCount()
        return result

    }
}
