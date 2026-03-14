import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBoardDto {
  @ApiPropertyOptional({ example: 'Updated Board' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: '#FF5E5E' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 'https://example.com/bg.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isStarred?: boolean;
}
