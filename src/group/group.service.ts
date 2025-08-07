import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Group,
  GroupDocument,
  GroupStatus,
} from 'src/database/models/group.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async createGroup(data: Partial<Group>): Promise<GroupDocument> {
    return this.groupModel.create({
      ...data,
      ownerId: new mongoose.Types.ObjectId(data.ownerId),
      status: GroupStatus.ACTIVE,
      memberIds: [...(data.memberIds || [])],
    });
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
    return this.groupModel
      .findOne({
        _id: id,
      })
      .lean();
  }

  async findSingleGroupByOwnerId(
    ownerId: mongoose.Types.ObjectId,
  ): Promise<GroupDocument | null> {
    return this.groupModel
      .findOne({
        ownerId: ownerId,
      })
      .lean();
  }

  async findGroupsByOwnerId(
    ownerId: mongoose.Types.ObjectId,
  ): Promise<Group[]> {
    return this.groupModel
      .find({
        ownerId: new mongoose.Types.ObjectId(ownerId),
      })
      .lean();
  }

  async findGroupsByMemberId(
    memberId: mongoose.Types.ObjectId,
  ): Promise<Group[]> {
    return this.groupModel
      .find({
        memberIds: { $in: new mongoose.Types.ObjectId(memberId) },
      })
      .lean();
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
      $pull: { memberIds: new mongoose.Types.ObjectId(memberId) },
    });
  }
}
