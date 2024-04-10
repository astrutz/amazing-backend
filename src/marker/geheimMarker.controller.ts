import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { UpdateMarkerDto } from './dto/UpdateMarker.dto';

@Controller('geheimmarker')
export class GeheimmarkerController {
  constructor(
    private readonly _markersService: MarkersService,
  ) {}

  @Patch(':id')
  updateMarker(@Param('id') id: string, @Body() updateMarkerDto: UpdateMarkerDto) {
    if (!this._markersService.idIsValid(id)) this._markersService.throwError('invalid id', 400);
    return this._markersService.updateMarker(id, updateMarkerDto);
  }

  @Delete(':id')
  deleteMarker(@Param('id') id: string) {
    console.log(id);
    if (!this._markersService.idIsValid(id)) this._markersService.throwError('invalid id', 400);
    return this._markersService.deleteMarker(id);
  }
}