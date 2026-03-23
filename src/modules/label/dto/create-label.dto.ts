import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLabelDto {
  @ApiProperty({ example: 'Bug' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#ef4444' })
  @IsString()
  color: string;
}
