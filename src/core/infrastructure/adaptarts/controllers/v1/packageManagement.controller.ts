import {
  All,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  MethodNotAllowedException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckDatabaseConnectionGuard } from 'src/core/application/decorators/check-database.decorator';
import { PackageResponse } from 'src/core/application/dtos/packages-management.dto';
import { PackageManagementService } from 'src/core/application/services/packages.service';
import { apiStatus } from 'src/utils/api/apiStatus';
import { Validator } from 'src/utils/api/apiValidations';

@Controller()
//@UseGuards(CheckDatabaseConnectionGuard)
export class PacakageManagementController {
  constructor(private PackageManagerController: PackageManagementService) {}
  

  /*@Get('/retrievepackages/1.0:id_status')
  async getAllPackagesByStatus(
    @Param('id_status') id: string,
  ): Promise<PackageResponse[]> {
    if (!Validator.isValidUUID(id)) { // Use 'isUUID' instead of 'isValidUUID'
      throw new BadRequestException('Invalid UUID');
    }
    return this.PackageManagerController.findAllPackagesByStatus(id);
  }*/

  /*@Get('retrievepackages/1.0')
  async getAllCountries(): Promise<PackageResponse[]> {
    return this.PackageManagerController.findAll();
  }*/ 






    
  @Get('retrievepackages/1.0/:id_status')
  async getAllPack(
    @Param('id_status') id: string,
  ): Promise<PackageResponse[]> {
    return this.PackageManagerController.findAllPackagesByStatus(id)
  }

}
