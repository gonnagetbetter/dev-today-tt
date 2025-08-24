import { IsNotEmpty, IsString } from 'class-validator';

export class GetPopulationDto {
  @IsString()
  @IsNotEmpty()
  country: string;
}
