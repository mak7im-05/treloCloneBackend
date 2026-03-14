import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMemberDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty({ required: false, default: 'member' })
  @IsOptional()
  @IsString()
  role?: string;
}

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  role: string;
}

export class AssignCardDto {
  @ApiProperty()
  @IsInt()
  userId: number;
}
