import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { UserService } from 'src/user/user.service';
import { createGroupDto } from './dto/createGroup.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { addOrRemoveMemberDto } from './dto/addOrRemoveMember.dto';

@Controller('group')
@UseGuards(AuthGuard)
export class GroupController {
  constructor(
    private groupService: GroupService,
    private userService: UserService,
  ) {}

  @Post('/create')
  async createNewGroup(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() data: createGroupDto,
  ) {
    try {
      await this.groupService.createGroup({ ...data });
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Could not create group', error: error });
    }
    response.status(200).send({ message: 'Group created successfully' });
  }

  @Post('/:groupId/add-member')
  async addMemberToGroup(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('groupId') groupId: mongoose.Types.ObjectId,
    @Body() data: addOrRemoveMemberDto,
  ) {
    try {
      const group = await this.groupService.findSingleGroupById(groupId);
      if (!group) response.status(400).send({ message: 'Group not found' });

      if (group?.memberIds.includes(data.memberId))
        response.status(200).send({ message: 'Member already in group' });

      await this.groupService.addMemberToGroup(groupId, data.memberId);

      response.status(200).send({ message: 'Member added to group' });
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Could not add member to group', error: error });
    }
    response
      .status(200)
      .send({ message: 'Member added to group successfully' });
  }

  @Post('/:groupId/remove-member')
  async removeMemberFromGroup(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('groupId') groupId: mongoose.Types.ObjectId,
    @Body() data: addOrRemoveMemberDto,
  ) {
    try {
      const group = await this.groupService.findSingleGroupById(groupId);
      if (!group) response.status(400).send({ message: 'Group not found' });

      if (group?.memberIds.includes(data.memberId))
        response.status(200).send({ message: 'Member already in group' });

      await this.groupService.removeMemberFromGroup(groupId, data.memberId);

      response.status(200).send({ message: 'Member added to group' });
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Could not add member to group', error: error });
    }
    response
      .status(200)
      .send({ message: 'Member added to group successfully' });
  }
}
