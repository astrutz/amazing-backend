import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateMarkerDto } from './dto/CreateMarker.dto';
import { Marker } from './schemas/marker.schema';
import { UpdateMarkerDto } from './dto/UpdateMarker.dto';

@Injectable()
export class MarkersService {

  constructor(@InjectModel(Marker.name) private markerModel: Model<Marker>,
              @InjectConnection() private connection: Connection) {
  }

  async createMarker(createMarkerDto: CreateMarkerDto): Promise<Marker> {
    const newMarker = new this.markerModel(createMarkerDto);
    return newMarker.save();
  }
  
  async updateMarker(markerId: string, updateMarkerDto: UpdateMarkerDto): Promise<Marker> {
    return this.markerModel.findByIdAndUpdate(markerId, updateMarkerDto, {new: true});
  }

  async deleteMarker(markerId: string): Promise<Marker> {
   return this.markerModel.findByIdAndDelete(markerId);
  }

  async getMarkers(): Promise<Marker[]> {
    return this.markerModel.find();
  }
}