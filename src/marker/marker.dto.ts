import { IsString, IsNumber, IsLatitude, IsLongitude } from 'class-validator';

export class MarkerDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsNumber()
  @IsLongitude()
  lng: number;
}