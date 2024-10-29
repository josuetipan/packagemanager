// minio.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { MinioService as MinioClient } from 'nestjs-minio-client';


@Injectable()
export class MinioService {
  private minioClient: MinioClient;

  constructor() {
    this.minioClient = new MinioClient({
      endPoint: 'localhost', // Cambia esto si usas otro host
      port: 9000,
      useSSL: false,
      accessKey: 'admin',
      secretKey: 'admin123',
    });
  }
  
  async uploadFile(bucketName: string, file: Express.Multer.File, contentType: string): Promise<string> {
    const filePath = `${Date.now()}_${file.originalname}`;
    const metaData = {
      'Content-Type': contentType
    }
    await this.minioClient.client.putObject(bucketName, filePath, file.buffer, metaData);
    return filePath; // Devuelve la ruta donde se almacenó el archivo
  }

  async getFile(bucketName: string, filePath: string): Promise<string> {
    const url = this.minioClient.client.presignedUrl('GET', bucketName, filePath, 24 * 60 * 60); // URL válida por 24 horas
    return url; // Devuelve la URL para acceder al archivo
  }
}
