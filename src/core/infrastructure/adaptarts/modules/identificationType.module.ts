import { MiddlewareConsumer, Module } from '@nestjs/common';
import { IdentificationTypeController } from '../controllers/v1/identificationType.controller';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerModule } from 'src/core/application/loggger/logger.module';
import {  PaquetesService } from 'src/core/application/services/packages.service';

@Module({
  imports: [LoggerModule.register(process.env.USE_KAFKA === 'true')],
  controllers:[IdentificationTypeController],
  providers: [PaquetesService, PrismaService],
})
export class PackagesModule {}
