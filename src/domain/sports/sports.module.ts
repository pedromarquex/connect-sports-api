import { PrismaModule } from '@/infra/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

@Module({
  controllers: [SportsController],
  providers: [SportsService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class SportsModule {}
