import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { MarkersService } from "./markers.service";
import { CreateMarkerDto } from "./dto/CreateMarker.dto";

@Controller('markers')
export class MarkerController {
  constructor(
    private readonly _markersService: MarkersService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createMarker(@Body() createMarkerDto: CreateMarkerDto) {
    console.log(createMarkerDto);
    return this._markersService.createMarker(createMarkerDto);
  }
}