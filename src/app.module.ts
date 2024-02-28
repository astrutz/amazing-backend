import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkerModule } from './marker/marker.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    MarkerModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@amazingcluster.ocrddeo.mongodb.net/?retryWrites=true&w=majority&appName=amazingcluster`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}