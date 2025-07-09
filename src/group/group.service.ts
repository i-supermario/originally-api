// import { Injectable } from '@nestjs/common';
// import { Group, Prisma } from '@prisma/client';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class GroupService {
//   constructor() {}

//   async createGroup(data: Prisma.GroupCreateInput): Promise<Group> {
//     return this.prisma.group.create({
//       data,
//     });
//   }

//   async updateGroup(
//     id: string,
//     data: Omit<Prisma.GroupUpdateInput, 'id'>,
//   ): Promise<Group> {
//     return this.prisma.group.update({
//       data: data,
//       where: {
//         id: id,
//       },
//     });
//   }

//   async deleteGroup(id: string): Promise<Group> {
//     return this.prisma.group.delete({
//       where: {
//         id: id,
//       },
//     });
//   }

//   async findSingleGroupByOwnerId(ownerId: string): Promise<Group | null> {
//     return this.prisma.group.findFirst({
//       where: {
//         ownerId: ownerId,
//       },
//     });
//   }

//   async findGroupsByOwnerId(ownerId: string): Promise<Group[]> {
//     return this.prisma.group.findMany({
//       where: {
//         ownerId: ownerId,
//       },
//     });
//   }
// }
