import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMemberDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

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
