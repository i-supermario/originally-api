import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from 'src/database/models/group.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async createGroup(data: Partial<Group>): Promise<GroupDocument> {
    return this.groupModel.create({ ...data });
  }

  async updateGroup(
    id: string,
    data: Partial<Group>,
  ): Promise<GroupDocument | null> {
    return this.groupModel.findOneAndUpdate(
      { _id: id },
      {
        ...data,
      },
    );
  }

  async deleteGroup(id: string): Promise<GroupDocument | null> {
    return this.groupModel.findOneAndDelete({
      _id: id,
    });
  }

  async findSingleGroupByOwnerId(
    ownerId: string,
  ): Promise<GroupDocument | null> {
    return this.groupModel.findOne({
      ownerId: ownerId,
    });
  }

  async findGroupsByOwnerId(ownerId: string): Promise<Group[]> {
    return this.groupModel.find({
      ownerId: ownerId,
    });
  }
}
