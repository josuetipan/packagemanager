import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PackagesModule } from './core/infrastructure/adaptarts/modules/PackagesManagement.module';
import { PathMethodMiddleware } from './core/application/middleware/checkroutes.middleware';
import { MinioController } from './core/infrastructure/adaptarts/controllers/v1/mino.contoller';
import { MinioService } from './core/application/services/minio.service';

@Module({
  imports: [
    PackagesModule,
    //ConfigModule.forRoot({
    //envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    //isGlobal: true, // Hace que el ConfigModule esté disponible en toda la app sin necesidad de importarlo en cada módulo
    //}),
  ],
  controllers: [MinioController],
  providers: [MinioService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PathMethodMiddleware).forRoutes('*');
  }
}
