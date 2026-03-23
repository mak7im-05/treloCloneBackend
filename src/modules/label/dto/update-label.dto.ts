import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLabelDto {
  @ApiPropertyOptional({ example: 'Feature' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '#3b82f6' })
  @IsOptional()
  @IsString()
  color?: string;
}
