import { IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReorderCardDto {
  @ApiProperty({ example: 1, description: 'List ID' })
  @IsInt()
  listId: number;

  @ApiProperty({ example: [3, 1, 2], description: 'Card IDs in desired order' })
  @IsArray()
  @IsInt({ each: true })
  orderedIds: number[];
}
