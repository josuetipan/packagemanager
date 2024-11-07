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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'auth-guard-michimoney';
import { CheckDatabaseConnectionGuard } from 'src/core/application/decorators/check-database.decorator';
import { PackageResponse } from 'src/core/application/dtos/packages-management.dto';
import { LoggerKafkaService } from 'src/core/application/loggger/loggerKafka.service';
import { PackageManagementService } from 'src/core/application/services/packages.service';
import { apiBaseEntityName } from 'src/utils/api/apiEntites';
import { apiStatus } from 'src/utils/api/apiStatus';
import { Validator } from 'src/utils/api/apiValidations';

@Controller(
  {version: 'v1.0',}
)
@UseGuards(CheckDatabaseConnectionGuard)

export class PacakageManagementController {
  constructor(private PackageManagerController: PackageManagementService,
    private logger: LoggerKafkaService
  ) {}
  @ApiOperation({ summary: 'Retunds list of packages according to their status.' })
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
  
  @UseGuards(AuthGuard)
  @Get('retrievepackages/:id_status')
  async getAllPack(
    @Param('id_status') id: string, @Req() req: Request
  ): Promise<PackageResponse[]> {
    this.logger.log(JSON.stringify(req.url), `retrievepackages/:id_status`,
    apiBaseEntityName
  )
  const packaheControler = await this.PackageManagerController.findAllPackagesByStatus(id, req)
    return packaheControler
  }

}
