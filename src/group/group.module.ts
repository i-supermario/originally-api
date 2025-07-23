import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UserModule } from 'src/user/user.module';
import { SessionModule } from 'src/session/session.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, groupSchema } from 'src/database/models/group.schema';

@Module({
  imports: [
    UserModule,
    SessionModule,
    MongooseModule.forFeature([{ name: Group.name, schema: groupSchema }]),
  ],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
