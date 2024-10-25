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
import { PaquetesService } from 'src/core/application/services/packages.service';
import { Paquete } from 'src/core/domain/paquete.entity';
import { apiStatus } from 'src/utils/api/apiStatus';

@Controller()
@UseGuards(CheckDatabaseConnectionGuard)
export class IdentificationTypeController {
  constructor(private paqueteConstructor: PaquetesService) {}

  @ApiResponse(apiStatus.ok)
  @ApiResponse(apiStatus.badRequest)
  @ApiResponse(apiStatus.unauthorized)
  @ApiResponse(apiStatus.forbidden)
  @ApiResponse(apiStatus.methodNotserviceowed)//405
  @ApiResponse(apiStatus.requestTimeout)
  @ApiResponse(apiStatus.internalServerError)
  @ApiResponse(apiStatus.serviceUnavailable)
  @ApiResponse(apiStatus.conflict)
  @ApiResponse(apiStatus.notFound)
  

  @Get('/retrievepackages/1.0')
  async getAllPaquete(@Req() req): Promise<Paquete[]> {
    console.log(req.status);
    return this.paqueteConstructor.findAll(req.status);
  }
}
