import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { MarkerModule } from '../marker/marker.module';

@Module({
  imports: [MarkerModule],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {
}
