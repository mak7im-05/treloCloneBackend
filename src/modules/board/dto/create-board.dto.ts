import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: 'My Board' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: '#4680FF' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: 'https://example.com/bg.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
