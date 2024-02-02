import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MarkerService } from "./marker.service";
import { Marker } from "./marker.model";
import { MarkerDto } from "./marker.dto";

@Controller('marker')
export class MarkerController {
  constructor(
    private readonly _markerService: MarkerService,
  ) {}


  @Get()
  getAll(): Marker[] {
    return this._markerService.getAll();
  }

  @Get()
  findOne(@Param('id') id: string): Marker {
    return this._markerService.findOne(id);
  }

  @Post()
  create(@Body() markerDto: MarkerDto): Marker {
    const marker = this._markerService.createMarker(markerDto);
    return marker;
  }
}
