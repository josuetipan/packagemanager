import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/core/application/services/minio.service';

@Controller('images')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const bucketName = process.env.MINIO_BACKED; // Asegúrate de que el bucket existe
    const contentType = file.mimetype || 'video/mp4';
    const filePath = await this.minioService.uploadFile(
      bucketName,
      file,
      contentType,
    );
    return { filePath }; // Devuelve la ruta del archivo subido
  }

  @Get(':filePath')
  async getFile(@Param('filePath') filePath: string) {
    try {
      console.log(filePath);

      const bucketName = process.env.MINIO_BACKED; // Asegúrate de que el bucket existe
      const url = await this.minioService.getFile(bucketName, filePath);
      console.log('es link de controller' + url);
      return { url };
    } catch (error) {
      throw new BadRequestException(error);
    } // Devuelve la URL para acceder al archivo
  }
}
