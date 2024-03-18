import { IsString, IsNumber, IsLatitude, IsLongitude, IsNotEmpty, IsOptional } from "class-validator";

export class CreateMarkerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

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

  @IsOptional()
  @IsString()
  pictureUrl: string;
}
