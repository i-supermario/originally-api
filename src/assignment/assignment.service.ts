import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { AssignmentDetails } from 'src/common/types/assignment';
import {
  Assignment,
  AssignmentDocument,
  Task,
  TaskStatus,
} from 'src/database/models/assignment.schema';
import { User } from 'src/database/models/user.schema';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: Model<AssignmentDocument>,
  ) {}

  async createAssignment(data: Partial<Assignment>): Promise<Assignment> {
    const assignment = await this.assignmentModel.create({
      ...data,
      ownerId: new mongoose.Types.ObjectId(data.ownerId),
      tasks: data.tasks || [],
    });
    return assignment;
  }

  async deleteAssignmentById(id: mongoose.Types.ObjectId) {
    return await this.assignmentModel.findByIdAndDelete(id);
  }

  async findAssignmentById(
    id: mongoose.Types.ObjectId,
  ): Promise<Assignment | null> {
    return await this.assignmentModel.findById(id);
  }

  async findAssignmentsByOwnerId(
    ownerId: mongoose.Types.ObjectId,
  ): Promise<Assignment[]> {
    return (
      (await this.assignmentModel.find({
        ownerId: new mongoose.Types.ObjectId(ownerId),
      })) || []
    );
  }

  async findAssignmentByAssigneeId(
    assigneeId: mongoose.Types.ObjectId,
  ): Promise<Assignment[]> {
    return (
      (await this.assignmentModel.find({
        assigneeId: new mongoose.Types.ObjectId(assigneeId),
      })) || []
    );
  }

  async findAssignmentDetailsById(
    id: mongoose.Types.ObjectId,
  ): Promise<AssignmentDetails> {
    const assignmentDetails =
      await this.assignmentModel.aggregate<AssignmentDetails>([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'assigneeId',
            foreignField: '_id',
            as: 'assigneeDetails',
          },
        },
        {
          $unwind: {
            path: '$assigneeDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'ownerId',
            foreignField: '_id',
            as: 'ownerDetails',
          },
        },
        {
          $unwind: {
            path: '$ownerDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

    // console.log(assignmentDetails);

    return assignmentDetails[0];
  }

  async addTaskToAssignment(
    assignmentId: mongoose.Types.ObjectId,
    task: Task,
  ): Promise<Assignment | null> {
    const assignment = this.assignmentModel.findByIdAndUpdate(assignmentId, {
      $addToSet: {
        tasks: task,
      },
    });

    return assignment;
  }

  async removeTaskFromAssignment(
    assignmentId: mongoose.Types.ObjectId,
    taskId: mongoose.Types.ObjectId,
  ) {
    return await this.assignmentModel.updateOne(
      { _id: assignmentId },
      {
        $pull: {
          tasks: { _id: taskId },
        },
      },
    );
  }

  async startTaskInAssignment(
    assignmentId: mongoose.Types.ObjectId,
    taskId: mongoose.Types.ObjectId,
  ) {
    return this.assignmentModel.updateOne(
      {
        'tasks._id': taskId,
      },
      [
        {
          $set: {
            tasks: {
              $map: {
                input: '$tasks',
                as: 'task',
                in: {
                  $cond: [
                    { $eq: ['$$task._id', taskId] },
                    {
                      $mergeObjects: [
                        '$$task',
                        { status: TaskStatus.PROGRESSING },
                      ],
                    },
                    '$$task',
                  ],
                },
              },
            },
          },
        },
      ],
    );
  }

  async assignTaskTo(
    assignmentId: mongoose.Types.ObjectId,
    assigneeId: mongoose.Types.ObjectId,
  ) {
    return this.assignmentModel.findByIdAndUpdate(assignmentId, {
      assigneeId: assigneeId,
    });
  }

  async endTaskInAssignment(
    assignmentId: mongoose.Types.ObjectId,
    taskId: mongoose.Types.ObjectId,
  ) {
    return this.assignmentModel.updateOne(
      {
        'tasks._id': taskId,
      },
      [
        {
          $set: {
            tasks: {
              $map: {
                input: '$tasks',
                as: 'task',
                in: {
                  $cond: [
                    {
                      $eq: ['$$task._id', new mongoose.Types.ObjectId(taskId)],
                    },
                    {
                      $mergeObjects: [
                        '$$task',
                        { status: TaskStatus.FINISHED },
                      ],
                    },
                    '$$task',
                  ],
                },
              },
            },
          },
        },
      ],
    );
  }

  async rearrangeTasks(
    assignmentId: mongoose.Types.ObjectId,
    orderedTaskIds: mongoose.Types.ObjectId[],
  ) {
    const objectIds = orderedTaskIds.map(
      (id) => new mongoose.Types.ObjectId(id),
    );

    return await this.assignmentModel.updateOne(
      { _id: new mongoose.Types.ObjectId(assignmentId) },
      [
        {
          $set: {
            tasks: {
              $map: {
                input: objectIds,
                as: 'tid',
                in: {
                  $first: {
                    $filter: {
                      input: '$tasks',
                      as: 't',
                      cond: { $eq: ['$$t._id', '$$tid'] },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    );
  }
}
