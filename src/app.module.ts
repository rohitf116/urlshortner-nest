import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './urls/urls.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), UrlsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
