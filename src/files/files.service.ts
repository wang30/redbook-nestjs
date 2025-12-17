import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(private config: ConfigService) {}

  getFileUrl(filename: string) {
    const base = this.config.get('UPLOAD_BASE_URL');
    return `${base}/${filename}`;
  }
}
