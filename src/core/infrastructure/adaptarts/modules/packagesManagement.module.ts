import { MinioController } from '../controllers/minio.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PacakageManagementController} from '../controllers/v1/packageManagement.controller';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerModule } from 'src/core/application/loggger/logger.module';
import {  PackageManagementService } from 'src/core/application/services/packages.service';
import { MinioService } from 'src/core/application/services/minio.service';

@Module({
  imports: [LoggerModule.register(process.env.USE_KAFKA === 'true')],
  controllers:[PacakageManagementController, MinioController],
  providers: [PackageManagementService, PrismaService, MinioService],
})
export class PackagesModule {}
