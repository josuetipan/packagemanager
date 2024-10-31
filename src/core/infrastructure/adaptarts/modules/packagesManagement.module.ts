import {Module } from '@nestjs/common';
import { PacakageManagementController} from '../controllers/v1/packageManagement.controller';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerModule } from 'src/core/application/loggger/logger.module';
import {  PackageManagementService } from 'src/core/application/services/packages.service';
import { AuthGuardModule } from 'auth-guard-michimoney';
import { HttpModule } from '@nestjs/axios';
import { AuthConfig } from 'auth-guard-michimoney/dist/auth-config.dto';

@Module({
  imports: [
    LoggerModule.register(process.env.USE_KAFKA === 'true'),
    HttpModule,
    AuthGuardModule.register({
      introspectionUrl: 'http://192.168.100.221:31745/auth/realms/MICHIMONEYWEB_DEV/protocol/openid-connect/token/introspect',
      clientId: 'michimoney_app',
      clientSecret: '387f125b-da1d-4c4a-8964-d44ef8debe7c',
    } as AuthConfig), // Proporciona la configuración aquí
  ],
  controllers:[PacakageManagementController],
  providers: [PackageManagementService, PrismaService],
})
export class PackagesModule {}
