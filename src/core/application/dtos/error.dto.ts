import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto { 
  @ApiProperty({ description: 'Error code' })
  code: string;

  @ApiProperty({ description: 'Description of the error' })
  message: string;

  @ApiProperty({
    description: 'Date and time when the error occurred',
    type: String,
    format: 'date-time',
  })
  timestamp: string;

  @ApiProperty({ description: 'Name of the service that generated the error' })
  service: string;
}
