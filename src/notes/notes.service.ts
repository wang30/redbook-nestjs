import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDTO } from './dto/create-note.dto';
import { NoteResponseDto } from './dto/note-response.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepo: Repository<Note>,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: number, dto: CreateNoteDTO): Promise<NoteResponseDto> {
    const author = await this.usersService.findById(userId);

    // findById 返回的是 ProfileDto，所以这里需要再查一次实体
    const authorEntity = await this.notesRepo.manager.findOneOrFail(
      'User',
      { where: { id: userId } } as any,
    );

    const note = this.notesRepo.create({
      title: dto.title,
      content: dto.content,
      imageUrls: dto.imageUrls || [],
      author: authorEntity,
    });

    const saved = await this.notesRepo.save(note);
    return this.toResponseDto(saved);
  }

  async findAll(page = 1, limit = 10): Promise<NoteResponseDto[]> {
    const [notes] = await this.notesRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return notes.map((n) => this.toResponseDto(n));
  }

  async findOne(id: number): Promise<NoteResponseDto> {
    const note = await this.notesRepo.findOne({
      where: { id },
    });
    if (!note) {
      throw new NotFoundException('笔记不存在');
    }
    return this.toResponseDto(note);
  }

  private toResponseDto(note: Note): NoteResponseDto {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      imageUrls: note.imageUrls || [],
      author: {
        id: note.author.id,
        username: note.author.username,
        avatarUrl: note.author.avatarUrl,
      },
      createdAt: note.createdAt,
    };
  }
}
