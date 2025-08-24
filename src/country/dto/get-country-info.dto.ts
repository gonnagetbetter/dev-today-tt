import { IsNotEmpty, IsString } from 'class-validator';

export class GetCountryInfoDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;
}
