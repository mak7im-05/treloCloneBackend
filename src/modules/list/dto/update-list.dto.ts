import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateListDto {
  @ApiPropertyOptional({ example: 'In Progress' })
  @IsOptional()
  @IsString()
  title?: string;
}
