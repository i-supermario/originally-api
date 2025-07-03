import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroupController } from './group.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
