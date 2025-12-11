import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentUserData } from '../auth/current-user.decorator';
import { NoteResponseDto } from './dto/note-response.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // 需要登录
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: CurrentUserData,
    @Body() dto: CreateNoteDTO,
  ): Promise<NoteResponseDto> {
    return this.notesService.create(user.userId, dto);
  }

  // Feed列表，公开
  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = 10,
  ): Promise<NoteResponseDto[]> {
    return this.notesService.findAll(Number(page), Number(limit));
  }

  // 详情页，公开
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NoteResponseDto> {
    return this.notesService.findOne(id);
  }
}
