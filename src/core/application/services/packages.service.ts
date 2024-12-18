import { discounts } from './../../../../node_modules/.prisma/client/index.d';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../loggger/logger.service';
import { LoggerKafkaService } from '../loggger/loggerKafka.service';
import { apiBaseEntityName } from 'src/utils/api/apiEntites';
import { okResponse, PackageResponse } from '../dtos/packages-management.dto';
import { MinioController } from 'src/core/infrastructure/adaptarts/controllers/v1/mino.contoller';
import { MinioService } from './minio.service';
import { env } from 'process';

@Injectable()
export class PackageManagementService {
  constructor(
    private prisma: PrismaService,
    //private logger:LoggerKafkaService ,
    private logger: LoggerService,
    private controller: MinioService,
  ) {}

  async findAllPackagesByStatus(): Promise<okResponse> {
    try {
      const packagesPrimary = await this.prisma.packages.findMany({
        include: {
          discounts: true,
          levels: true,
          status: true,
        },
      });

      const packageByActiveLicense = packagesPrimary.filter(
        (packageData) => packageData.expiration_date >= new Date(),
      );
      const imgUrl = await this.images(packageByActiveLicense);
      const packageResponses: PackageResponse[] = packageByActiveLicense.map(
        (pkg, index) => {
          const discounts = pkg.discounts
            ? [
                {
                  discountId: pkg.discounts.id_discount,
                  discountName: pkg.discounts.name,
                  discountValue: pkg.discounts.number_discount,
                },
              ]
            : [];
          const level = pkg.levels
            ? {
                levelId: pkg.levels.id_level,
                levelName: pkg.levels.level_name,
                levelDescription: pkg.levels.description_level,
              }
            : null;
          return {
            name: pkg.name,
            originalPrice: pkg.price.toNumber(),
            discounts,
            level,
            status: pkg.status,
            content: pkg.content,
            description: pkg.description,
            imageUrl: imgUrl[index],
            features: pkg.characteristics,
            expirationDate: pkg.expiration_date,
          };
        },
      );
      console.log('------------' + imgUrl);
      const response: okResponse = {
        code: '200',
        messagges: 'OK',
        data: packageResponses,
      };

      return response;
    } catch (err) {
      throw err;
    }
  }

  async images(packageByActiveLicens) {
    const imagesResponse: PackageResponse[] = packageByActiveLicens.map(
      (pkg) => {
        return {
          imageUrl: pkg.package_photo,
        };
      },
    );
    const back = process.env.MINIO_BUCKET_IMAGEN;
    const imagesLinks: string[] = [];

    for (let i = 0; i < imagesResponse.length; i++) {
      const im = imagesResponse[i].imageUrl;
      const links = await this.controller.getFile(back, im);
      imagesLinks.push(links);
    }
    console.log(imagesLinks);

    return imagesLinks;
  }
}
