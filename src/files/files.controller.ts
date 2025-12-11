import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // 上传单张
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return {
      url: this.filesService.getFileUrl(file.filename),
    };
  }

  // 上传多张图
  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files', 9, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return {
      urls: files.map((f) => this.filesService.getFileUrl(f.filename)),
    };
  }
}
