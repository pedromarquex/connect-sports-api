import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './domain/places/places.module';
import { UsersModule } from './domain/users/users.module';
import { SportsModule } from './domain/sports/sports.module';

@Module({
  imports: [PlacesModule, ConfigModule.forRoot(), UsersModule, SportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
