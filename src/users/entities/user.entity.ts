import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Note } from '../../notes/entities/note.entity';

@Entity('users')
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 50 })
  email: string;

  // 这里存哈希后的密码，后面Auth部分再加密
  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ default: '' })
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Note, (note) => note.author)
  notes: Note[];
}