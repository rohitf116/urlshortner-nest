import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  longUrl: string;
}
