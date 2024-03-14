import { Module } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { MarkerController } from './marker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Marker, MarkerSchema } from './schemas/marker.schema';
import { GeheimmarkerController } from './geheimMarker.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Marker.name, schema: MarkerSchema }])],
  providers: [MarkersService],
  controllers: [MarkerController, GeheimmarkerController],
})
export class MarkerModule {
}
