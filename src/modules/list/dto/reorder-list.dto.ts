import { IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReorderListDto {
  @ApiProperty({ example: [3, 1, 2], description: 'List IDs in desired order' })
  @IsArray()
  @IsInt({ each: true })
  orderedIds: number[];
}
