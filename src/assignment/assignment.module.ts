import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { UserModule } from 'src/user/user.module';
import { SessionModule } from 'src/session/session.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Assignment,
  assignmentSchema,
} from 'src/database/models/assignment.schema';

@Module({
  imports: [
    UserModule,
    SessionModule,
    MongooseModule.forFeature([
      { name: Assignment.name, schema: assignmentSchema },
    ]),
  ],
  providers: [AssignmentService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
