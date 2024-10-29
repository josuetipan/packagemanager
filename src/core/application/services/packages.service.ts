import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../loggger/logger.service';
import { LoggerKafkaService } from '../loggger/loggerKafka.service';
import { apiBaseEntityName  } from 'src/utils/api/apiEntites';
import { PackageResponse } from '../dtos/packages-management.dto';

@Injectable()
export class PackageManagementService {
  constructor(
    private prisma: PrismaService,
    //private logger:LoggerKafkaService ,
    private logger:LoggerService ,
  ) {}


  async findAllPackagesByStatus(
    statusId: string
  ): Promise<PackageResponse[]> {
    const cleanedId = statusId.trim();
    try {
      // Busca los paquetes que coincidan con el id_status proporcionado
      const packagesP = await this.prisma.packages.findMany({
        where: { id_status: cleanedId },
        include: {
          discounts: true,
          levels: true,
        },
      });
  
      // Verifica si no se encontraron paquetes con el id_status dado
      if (!packagesP || packagesP.length === 0) {
        throw new NotFoundException(
          `No se encontraron paquetes para el ID de estado: ${statusId}`,
        );
      }
  
      // Mapea los datos obtenidos a la estructura de respuesta esperada
      const packageResponses: PackageResponse[] = packagesP.map((pkg) => {
        const currentDate = new Date();
        const result = {
          name: pkg.name,
          originalPrice: pkg.price.toNumber(),
          discounts:pkg.discounts ? 
          [  // Verifica si existe y es un array
            {
              discountId: pkg.discounts.id_discount,
              discountName: pkg.discounts.name,
              discountValue: pkg.discounts.number_discount,
            }
          ] 
            : [],        
          level:   // Verifica si existe y es un array
            {
              levelId: pkg.levels.id_level,
              levelName: pkg.levels.level_name,
              levelDescription: pkg.levels.description_level,
            },
          content: pkg.content,
          description: pkg.description,
          features: pkg.characteristics,
          imageUrl: pkg.package_photo,
        }
        if(pkg.expiration_date >= currentDate){
          return result;
          
        }
      }).filter(pkg => pkg !== null)
  
      return packageResponses;
    } catch (err) {
      // Maneja errores y lanza la excepción apropiada
      throw new NotFoundException(
        `Error al obtener paquetes para el ID de estado: ${statusId}`,
      );
    }
  }
}

  /*async findAll(): Promise<PackageResponse[]> {
    const paquetes = await this.prisma.packages.findMany()    
    const formattedPaquetes = paquetes.map(record => {
      return {
          id: record.id_package, // Cambiamos el nombre de la propiedad
          name: record.name,
          price : record.price,
          discount : record.discount,
          content : record.content,
          number_children : record.number_children,
          packege_photo : record.package_photo,
          status : record.id_status,
      };
  });
    this.logger.log(JSON.stringify(formattedPaquetes))
    return formattedPaquetes;
  }
    */
//----------------------------------------------------------------
 /* async findAllPackagesByStatus(
    statusId: string
  ): Promise<PackageResponse[]> {
    const cleanedId = statusId.trim();
    try {
      const onePagkage = await this.prisma.packages.findFirst({
        where: { id_status: cleanedId  },
      });
      const paquetes = await this.prisma.packages.findMany()    
    const formattedPaquetes = paquetes.map(record => {
      return {
          id:  record.id_package,                          // Cambiamos el nombre de la propiedad
          name: record.name,
          price : record.price,
          discount : record.id_discount,
          content : record.content,
          number_children : record.number_children,
          packege_photo : record.package_photo,
          status : record.id_status,
      }
    })
      return formattedPaquetes
    } catch (err) {
      // Maneja errores y lanza la excepción apropiada
      throw new NotFoundException(
        `Error al obtener paquetes para el ID de estado: ${statusId}`,
      );
    }
  }
  
}
*/

