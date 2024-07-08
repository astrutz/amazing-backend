import { IsString, IsNumber, IsLatitude, IsLongitude, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateMarkerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  @IsLongitude()
  lng: number;
}