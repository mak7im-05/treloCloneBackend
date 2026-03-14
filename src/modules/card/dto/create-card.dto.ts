import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Fix login bug' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'The login form throws an error...' })
  @IsOptional()
  @IsString()
  description?: string;
}
