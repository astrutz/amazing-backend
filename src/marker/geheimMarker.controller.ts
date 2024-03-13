import { Body, Controller, HttpException, Param, Patch, Delete } from "@nestjs/common";
import { MarkersService } from "./markers.service";
import mongoose, { isValidObjectId } from "mongoose";
import { UpdateMarkerDto } from "./dto/UpdateMarker.dto";

@Controller('geheimmarker')
export class GeheimmarkerController {
  constructor(
    private readonly _markersService: MarkersService,
  ) {}

  @Patch(':id') 
  updateMarker(@Param('id') id: string, @Body() updateMarkerDto: UpdateMarkerDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);
    return this._markersService.updateMarker(id, updateMarkerDto);
  }


  @Delete(':id')
  deleteMarker(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    console.log(id);
    
    if(!isValid) throw new HttpException('Invalid Id', 400);
    this._markersService.deleteMarker(id);
  }
}