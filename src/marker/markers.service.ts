import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { CreateMarkerDto } from "./dto/CreateMarker.dto";
import { Marker } from "./schemas/marker.schema";

@Injectable()
export class MarkersService {

  constructor(@InjectModel(Marker.name) private markerModel: Model<Marker>,
              @InjectConnection() private connection: Connection) { }

  getAll(): Promise<Marker[]> {
    return this.markerModel.find().exec();
  }

  async createMarker(createMarkerDto: CreateMarkerDto): Promise<Marker> {
    const newMarker = new this.markerModel(createMarkerDto);
    return newMarker.save();
  }
}