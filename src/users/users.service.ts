import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // 注册
  async create(createUserDto: CreateUserDto): Promise<UserProfileDto> {
    const { email, username, password, ...rest } = createUserDto;

    const exists = await this.usersRepo.findOne({
      where: [{ email }, { username }],
    });
    if (exists) {
      throw new ConflictException('邮箱或用户名已被占用');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.usersRepo.create({
      email,
      username,
      password: passwordHash,
      ...rest,
    });

    const saved = await this.usersRepo.save(user);
    return this.toProfileDto(saved);
  }

  async findById(id: number): Promise<UserProfileDto> {
    const user= await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return this.toProfileDto(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    // 注意：登录时我们需要拿到 password，所以这里返回实体
    return this.usersRepo.findOne({ where: { email } });
  }

  private toProfileDto(user: User): UserProfileDto {
    const { password, ...rest } = user;
    return rest as UserProfileDto;
  }
}
