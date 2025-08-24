import { IsNotEmpty, IsString } from 'class-validator';

export class GetFlagUrlDto {
  @IsString()
  @IsNotEmpty()
  iso2: string;
}
