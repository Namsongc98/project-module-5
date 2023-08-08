import { user } from './../users/type/user';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Profile } from './entity/profile';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) { }

    // tạo Profile
    async insertProfile(detaiProfile: ProfileType): Promise<any> {
        try {
            const findProfile = await this.profileRepository.findOneBy({ userId: detaiProfile.userId })
            if (findProfile) {
                Object.assign(findProfile, detaiProfile)
                return this.profileRepository.save(findProfile)
            } else {
                const profile = new Profile()
                Object.assign(profile, detaiProfile)
                return this.profileRepository.save(profile)
            }
        } catch (error) {
            throw new BadRequestException(error)
        }

    }

    // đếm profile
    async countProfile(): Promise<any> {
        try {
            return await this.profileRepository.count()
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // xử lí phân trang 
    async paginationUser(page, limit, email): Promise<any> {
        if (email) {
            const result = await this.profileRepository
                .query(`select u.*, p.firstName, p.lastName, p.avatar 
                        from modules_5.user as u  
                        left join modules_5.profile as p on u.id = p.userId 
                        where not role = 'admin' and u.email like  '%${email}%'
                        limit ${limit}
                        offset ${page};`)

            return result
        } else {
            const result = await this.profileRepository
                .query(`select u.*, p.firstName, p.lastName, p.avatar 
                        from modules_5.user as u  
                        left join modules_5.profile as p on u.id = p.userId 
                        where not role = 'admin' 
                        limit ${limit}    
                        offset  ${page}; `)
            return result
        }
    }
}
