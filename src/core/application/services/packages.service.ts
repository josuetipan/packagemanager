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
import { PackageResponse } from '../dtos/packages-management.dto';

@Injectable()
export class PackageManagementService {
  constructor(
    private prisma: PrismaService,
    private logger:LoggerKafkaService ,
    //private logger: LoggerService,
  ) {}

  async findAllPackagesByStatus(statusId: string): Promise<PackageResponse[]> {
    const cleanedId = statusId.trim();
    try {
      const packagesPrimary = await this.prisma.packages.findMany({
        where: { id_status: cleanedId },
        include: {
          discounts: true,
          levels: true,
          status: true,
        },
      });

      if (!packagesPrimary || packagesPrimary.length === 0) {
        throw new NotFoundException(
          `No se encontraron paquetes para el ID de estado: ${statusId}`,
        );
      }

      const packageByActiveLicense = packagesPrimary.filter(
        (packageData) =>
          packageData.status.id_status === cleanedId &&
          packageData.expiration_date >= new Date(),
      );

      const packageResponses: PackageResponse[] = packageByActiveLicense.map(
        (pkg) => {
          const discounts=pkg.discounts
          ? [
              {
                discountId: pkg.discounts.id_discount,
                discountName: pkg.discounts.name,
                discountValue: pkg.discounts.number_discount,
              },
            ]
          : []
          const level = pkg.levels 
          ? {
              levelId: pkg.levels.id_level,
              levelName: pkg.levels.level_name,
              levelDescription: pkg.levels.description_level,
            }
          : null
          return {
            name: pkg.name,
            originalPrice: pkg.price.toNumber(),
            status : pkg.status,
            discounts,
            level,
            content: pkg.content,
            description: pkg.description,
            features: pkg.characteristics,
            imageUrl: pkg.package_photo,
          };
          
        },
      );

      return packageResponses;
    } catch (err) {
      throw new NotFoundException(
        `Error al obtener paquetes para el ID de estado: ${statusId}`,
      );
    }
  }
}
