import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

@Controller('assignments')
class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  // Create new assignment
  @Post()
  async createAssignment(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body: any,
  ) {
    return this.assignmentService.createAssignment(body);
  }

  // Get one assignment by ID
  @Get(':id')
  async getAssignment(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: mongoose.Types.ObjectId,
  ) {
    const assignment = await this.assignmentService.findAssignmentById(id);

    if (!assignment) {
      response.status(400);
      return { message: 'Assignment not found' };
    }

    response.status(200);
    return { data: assignment };
  }

  // Delete assignment by ID
  @Delete(':id')
  deleteAssignment(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: mongoose.Types.ObjectId,
  ) {
    return this.assignmentService.deleteAssignmentById(id);
  }

  // Add a new task to assignment
  @Patch(':id/task')
  addTask(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() body: any,
  ) {
    return this.assignmentService.addTaskToAssignment(id, body);
  }

  // Start a task by taskId
  @Post(':id/task/:taskId/start')
  startTask(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: mongoose.Types.ObjectId,
    @Param('taskId') taskId: mongoose.Types.ObjectId,
  ) {
    return this.assignmentService.startTaskInAssignment(id, taskId);
  }

  // Complete a task by taskId
  @Post(':id/task/:taskId/complete')
  completeTask(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: mongoose.Types.ObjectId,
    @Param('taskId') taskId: mongoose.Types.ObjectId,
  ) {
    return this.assignmentService.endTaskInAssignment(id, taskId);
  }

  // Rearrange tasks order
  @Patch(':id/tasks/reorder')
  reorderTasks(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('id') assignmentId: mongoose.Types.ObjectId,
    @Body('orderedTaskIds') orderedTaskIds: mongoose.Types.ObjectId[],
  ) {
    return this.assignmentService.rearrangeTasks(assignmentId, orderedTaskIds);
  }
}
