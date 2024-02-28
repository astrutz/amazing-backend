import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkerModule } from './marker/marker.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MarkerModule, MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASWORD}@cluster0.ks2c83d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}