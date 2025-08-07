import { AssignmentDocument } from 'src/database/models/assignment.schema';
import { User } from 'src/database/models/user.schema';

export type AssignmentDetails = AssignmentDocument & {
  assigneeDetails: User | null;
  ownerDetails: User | null;
};
