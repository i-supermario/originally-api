import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SessionController, PrismaModule],
  providers: [SessionService],
})
export class SessionModule {}
