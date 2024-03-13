import { IsString, IsNumber, IsLatitude, IsLongitude, IsNotEmpty, IsOptional } from "class-validator";

export class CreateMarkerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
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