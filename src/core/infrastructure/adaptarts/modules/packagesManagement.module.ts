import {Module } from '@nestjs/common';
import { PacakageManagementController} from '../controllers/v1/packageManagement.controller';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerModule } from 'src/core/application/loggger/logger.module';
import {  PackageManagementService } from 'src/core/application/services/packages.service';
import { AuthGuardModule } from 'auth-guard-michimoney';
import { HttpModule } from '@nestjs/axios';
import { AuthConfig } from 'auth-guard-michimoney/dist/auth-config.dto';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule.register(process.env.USE_KAFKA === 'true'),
    HttpModule,
    AuthGuardModule.registerAsync(), // Proporciona la configuración aquí
  ],
  controllers:[PacakageManagementController],
  providers: [PackageManagementService, PrismaService, ConfigService],
})
export class PackagesModule {}
