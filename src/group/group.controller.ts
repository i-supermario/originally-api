// import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
// import { GroupService } from './group.service';
// import { UserService } from 'src/user/user.service';
// import { createGroupDto } from './dto/createGroup.dto';
// import { AuthGuard } from 'src/guards/auth.guard';
// import { Request, Response } from 'express';

// @Controller('group')
// @UseGuards(AuthGuard)
// export class GroupController {
//   constructor(
//     private groupService: GroupService,
//     private userService: UserService,
//   ) {}

//   @Post('/create')
//   async createNewGroup(
//     @Req() request: Request,
//     @Res({ passthrough: true }) response: Response,
//     @Body() data: createGroupDto,
//   ) {
//     try {
//       await this.groupService.createGroup({ ...data });
//     } catch (error) {
//       response
//         .status(400)
//         .send({ message: 'Could not create group', error: error });
//     }
//     response.status(200).send({ message: 'Group created successfully' });
//   }
// }
