import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../loggger/logger.service';
import { LoggerKafkaService } from '../loggger/loggerKafka.service';
import { apiBaseEntityName, apiBaseEntityPackage } from 'src/utils/api/apiEntites';
import { PackageResponse } from '../dtos/packages-management.dto';

@Injectable()
export class PackageManagementService {
  constructor(
    private prisma: PrismaService,
    private logger:LoggerKafkaService ,
    //private logger:LoggerService ,
  ) {}


  /*async findAll(): Promise<Paquete[]> {
    const paquetes = await this.prisma.packages.findMany()    
    const formattedPaquetes = paquetes.map(record => {
      return {
          id: record.id_package, // Cambiamos el nombre de la propiedad
          name: record.name,
          price : record.price,
          discount : record.id_discount
          content : record.content,
          number_children : record.number_children,
          packege_photo : record.package_photo,
          status : record.id_status,
          last_modified_by : record.last_modified_by,
          created_at : record.created_at,
          last_modified_at : record.last_modified_at, 
      };
  });
    this.logger.log(JSON.stringify(formattedPaquetes))
    return formattedPaquetes;
  }*/

  async findAllPackagesByStatus(
    statusId : string
  ): Promise<PackageResponse> {
    const   cleanedId = statusId.trim(); 
    try {
      const statusPackage = await this.prisma.status.findUnique({
        where: { id_status: cleanedId },
      });
      const packagesP = await this.prisma.packages.findMany({ 
        where: { id_status: cleanedId },
        include: {
          discounts: true,
          levels: true,
        },
      });
      if(packagesP === null || statusPackage === null) {
        throw new NotFoundException(
          `Package ${apiBaseEntityPackage} not found for ID : ${statusId}`,
        );
      }
      return {
        name: statusPackage.name,
        originalPrice:  
        discounts: packages[0].discounts.map((discount) => ({
          discountId: discount.id_discount,
          discountName: discount.discount_name,
          discountValue: discount.discount_value,
        })),
        level: packages[0].levels.map((level) => ({
          levelId: level.id_level,
          levelName: level.level_name,
          levelDescription: level.level_description,
        })),
        content: packages[0].content,
        description: packages[0].description,
        features: packages[0].features,
        imageUrl: packages[0].package_photo,
      }
    }catch (err) { 

    }
      
  }
  
}