// minio.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MinioService as MinioClient } from 'nestjs-minio-client';
import * as https from 'https';

@Injectable()
export class MinioService {
  private minioClient: MinioClient;

  constructor() {
    this.minioClient = new MinioClient({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      transportAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }

  async uploadFile(
    bucketName: string,
    file: Express.Multer.File,
    contentType: string,
  ): Promise<string> {
    try {
      const filePath = `${Date.now()}_${file.originalname}`;
      console.log('est es el path: ' + filePath);
      const metaData = {
        'Content-Type': contentType,
      };
      await this.minioClient.client.putObject(
        bucketName,
        filePath,
        file.buffer,
        metaData,
      );
      return filePath;
    } catch (error) {
      throw new InternalServerErrorException(error);
    } // Devuelve la ruta donde se almacenó el archivo
  }

  async getFile(bucketName: string, filePath: string): Promise<string> {
    console.log('--', bucketName, filePath);
    try {
      const url = await this.minioClient.client.presignedUrl(
        'GET',
        bucketName,
        filePath,
        24 * 60 * 60,
      ); // URL válida por 24 horas
      console.log('este es el link de servicio: ' + url);
      return url; // Devuelve la URL para acceder al archivo
    } catch (error) {
      throw new InternalServerErrorException('-----' + error);
    }
  }
}
