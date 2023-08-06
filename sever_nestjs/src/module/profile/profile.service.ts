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

    // search tên
    async searchName(search: { name: string }): Promise<any> {
        const { name } = search
        const result = await this.profileRepository
            .createQueryBuilder("profile")
            .select(['email', "status", 'avatar', 'firstName', "lastName",])
            .innerJoin("profile.user", "user")
            .where("profile.firstName like :name OR profile.lastName like :name ", { name: `%${name}%` })
            .getRawMany()
        return result
    }

    async paginationUser(page, limit): Promise<any> {
        const result = await this.profileRepository
            .createQueryBuilder("profile")
            .select(["avatar", "firstName", "lastName", "status", "email"])
            .leftJoin("profile.user", "user")
            .where("user.role != :role", { role: "admin" })
            .limit(limit)
            .offset(page)
            .getRawMany()
        return result
    }
}
