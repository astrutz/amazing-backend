import { IsString, IsNumber, IsLatitude, IsLongitude, IsNotEmpty, IsOptional } from "class-validator";

export class CreateMarkerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  uploader: string;

  @IsString()
  @IsOptional()
  country: string;

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
