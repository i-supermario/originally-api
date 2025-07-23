import { Group } from 'src/database/models/group.schema';
import { User } from 'src/database/models/user.schema';

export interface GroupWithMembers extends Group {
  ownerDetails: User;
  memberDetails?: User[];
}
