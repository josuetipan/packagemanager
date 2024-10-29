import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PacakageManagementController} from '../controllers/v1/packageManagement.controller';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerModule } from 'src/core/application/loggger/logger.module';
import {  PackageManagementService } from 'src/core/application/services/packages.service';

@Module({
  imports: [LoggerModule.register(process.env.USE_KAFKA === 'true')],
  controllers:[PacakageManagementController],
  providers: [PackageManagementService, PrismaService],
})
export class PackagesModule {}
