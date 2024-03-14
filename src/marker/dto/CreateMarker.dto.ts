import { IsString, IsNumber, IsLatitude, IsLongitude, IsNotEmpty } from "class-validator";

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

  @IsString()
  pictureUrl: string;
}