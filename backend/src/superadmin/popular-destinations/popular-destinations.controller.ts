import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { PopularDestinationsService } from './popular-destinations.service';

@Controller('superadmin/popular-destinations')
export class PopularDestinationsController {
  constructor(private service: PopularDestinationsService) {}

  @Get()
  async list() {
    return this.service.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('destination_img', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = join(process.cwd(), 'uploads', 'destinations');
          if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (_req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('File harus gambar') as any, false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async create(@Body('title') title: string, @UploadedFile() file: Express.Multer.File) {
    if (!title) throw new BadRequestException('title wajib diisi');
    if (!file) throw new BadRequestException('destination_img wajib diupload');

    // Simpan path relatif yang dilayani oleh ServeStatic
    const relativePath = '/uploads/destinations/' + file.filename;

    return this.service.create(title, relativePath);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
