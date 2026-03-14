import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MoveCardDto {
  @ApiProperty({ example: 2, description: 'Target list ID' })
  @IsInt()
  targetListId: number;

  @ApiProperty({ example: 0, description: 'Position in target list' })
  @IsInt()
  order: number;
}
