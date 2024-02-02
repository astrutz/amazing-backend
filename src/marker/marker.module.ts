import { Module } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';

@Module({
  providers: [MarkerService],
  controllers: [MarkerController]
})
export class MarkerModule {}
