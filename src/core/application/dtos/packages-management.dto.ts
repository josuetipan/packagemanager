import { ApiProperty } from '@nestjs/swagger';

export class PackageResponse {
  @ApiProperty({ description: 'Name of the package' })
  name?: string;

  @ApiProperty({ description: 'Original price of the package' })
  originalPrice?: number;

  @ApiProperty({ type: 'array',
    items: {
      type: 'object',
      properties: {
        discountId: { type: 'string', description: 'ID of  discount' },
        discountName: { type: 'string', description: 'Name of  discount' },
        discountValue: { type: 'number', description: 'Value of discount' },
      },
    }, })
  discounts?: Array<{
    discountId: string;
    discountName: string;
    discountValue: number;
  }>;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        levelId: { type: 'string', description: 'ID of the level' },
        levelName: { type: 'string', description: 'Name of the level' },
        levelDescription: { type: 'string', description: 'Description of the level' },
      },
    },
  })
  level?: Array<{
    levelId?: string;
    levelName?: string;
    levelDescription?: string;
  }>;

  @ApiProperty({ description: 'Package Contents' })
  content?: string;

  @ApiProperty({ description: 'Description of package' })
  description?: string;

  @ApiProperty({ description: 'Features of packages' })
  features?: string; 

  @ApiProperty({ description: 'Package image url' })
  imageUrl?: string;
}




