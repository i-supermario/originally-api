import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
    id: mongoose.Types.ObjectId,
    data: Partial<Group>,
  ): Promise<GroupDocument | null> {
    return this.groupModel.findOneAndUpdate(
      { _id: id },
      {
        ...data,
      },
    );
  }

  async deleteGroup(
    id: mongoose.Types.ObjectId,
  ): Promise<GroupDocument | null> {
    return this.groupModel.findOneAndDelete({
      _id: id,
    });
  }

  async findSingleGroupById(
    id: mongoose.Types.ObjectId,
  ): Promise<GroupDocument | null> {
    return this.groupModel.findOne({
      _id: id,
    });
  }

  async findSingleGroupByOwnerId(
    ownerId: mongoose.Types.ObjectId,
  ): Promise<GroupDocument | null> {
    return this.groupModel.findOne({
      ownerId: ownerId,
    });
  }

  async findGroupsByOwnerId(
    ownerId: mongoose.Types.ObjectId,
  ): Promise<Group[]> {
    return this.groupModel.find({
      ownerId: ownerId,
    });
  }

  async addMemberToGroup(
    groupId: mongoose.Types.ObjectId,
    memberId: mongoose.Types.ObjectId,
  ): Promise<GroupDocument | null> {
    return this.groupModel.findByIdAndUpdate(groupId, {
      $addToSet: { memberIds: memberId },
    });
  }

  async removeMemberFromGroup(
    groupId: mongoose.Types.ObjectId,
    memberId: mongoose.Types.ObjectId,
  ): Promise<GroupDocument | null> {
    return this.groupModel.findByIdAndUpdate(groupId, {
      $pull: { memberIds: memberId },
    });
  }
}
