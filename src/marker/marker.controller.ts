import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/CreateMarker.dto';

@Controller('markers')
export class MarkerController {
  constructor(
    private readonly _markersService: MarkersService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createMarker(@Body() createMarkerDto: CreateMarkerDto) {
    if ((await this._markersService.alreadyExists(createMarkerDto))) {
      this._markersService.throwError('Marker already exists', 400);
    }
    return this._markersService.createMarker(createMarkerDto);
  }

  @Get()
  getUsers() {
    return this._markersService.getMarkers();
  }
}
