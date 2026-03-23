import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9...' })
  @IsString()
  refresh_token: string;
}
