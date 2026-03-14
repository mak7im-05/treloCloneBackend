import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({ example: 'To Do' })
  @IsString()
  title: string;
}
