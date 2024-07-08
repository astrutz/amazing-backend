import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MarkerDocument = HydratedDocument<Marker>;

@Schema({
  toObject:{
    versionKey: false
  },
  toJSON:{
    versionKey: false
  }
})
export class Marker {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: false })
  pictureUrl: string;

  @Prop({ required: false })
  uploader: string;

  @Prop({ required: false })
  country: string;
}

export const MarkerSchema = SchemaFactory.createForClass(Marker);