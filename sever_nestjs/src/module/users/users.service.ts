import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createUserBody } from 'src/module/users/type/user';
import { User } from './entity/user';
import { Profile } from '../profile/entity/profile';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) { }

  // find Email for guard 
  async findEmail(userDetail: createUserBody) {
    return await this.userRepository.findOne({
      where: {
        email: userDetail.email,
      },
    });
  }

  // 
  async findProfile(userDetail: createUserBody) {
    return await this.profileRepository.findOneBy({ userId: userDetail.id })
  }
    
  // register 
  async createUser(userDetail: createUserBody) {
    try {
      const isEmail = await this.userRepository.findOne({
        where: {
          email: userDetail.email,
        },
      });
      if (isEmail) throw new BadRequestException('Email đã tồn tại');

      const hashedPassword = await bcrypt.hash(userDetail.password, 10);
      userDetail.password = hashedPassword
      this.userRepository.save(userDetail);
      return {
        status: 201,
        message: 'post thành công ',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // get alluser
  async findAll(): Promise<any> {
    const result = await this.profileRepository
      .query(`select u.*, p.firstName, p.lastName, p.avatar 
                from modules_5.user as u  
                left join modules_5.profile as p on u.id = p.userId 
                where not role = 'admin';`)
    return result
  }

  // get id user
  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id: id } })
  }

  //update user
  async updateUser(updateUser: { id: string, password: string, newPassword: string }) {
    const user = await this.userRepository.findOne({
      where: {
        id: updateUser.id
      }
    })
    if (!user) throw new BadRequestException(`không tìm thấy học viên này`)
    const result = await bcrypt.compare(updateUser.password, user.password)
    if (!result) throw new BadRequestException(`Mật khẩu cũ không đúng`)

    const newPassword = await bcrypt.hash(updateUser.newPassword, 10)
    const newUser = {
      password: newPassword
    }
    return await this.userRepository.update(updateUser.id, newUser)

  }

  // khóa người dùng
  async putLock(id): Promise<void> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException("không thấy người dùng này")
    const userLock = await this.userRepository.create({
      ...user,
      status: false
    })
    await this.userRepository.save(userLock)
  }

  //mở khóa người dùng
  async putUnlock(id): Promise<void> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException("không thấy người dùng này")
    const userLock = await this.userRepository.create({
      ...user,
      status: true
    })
    await this.userRepository.save(userLock)
  }

  // đếm người dùng 
  async CountUser(): Promise<any> {
    const result = await this.userRepository
      .createQueryBuilder("user")
      .where("user.role != :role", { role: "admin" })
      .getCount()
    return result
  }

  // xóa người dùng
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
