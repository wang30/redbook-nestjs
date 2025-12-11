import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 注册接口：POST /users
  @Post()
  async register(@Body() dto: CreateUserDto): Promise<UserProfileDto> {
    return this.usersService.create(dto);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserProfileDto> {
    return this.usersService.findById(id);
  }
}
