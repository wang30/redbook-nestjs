import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class FilesService {
  getFileUrl(filename: string) {
    return `http://localhost:3000/uploads/${filename}`;
  }
}
