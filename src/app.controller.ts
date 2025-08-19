import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  health(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.status(200);
    return { status: 'healthy', timestamp: new Date().toISOString() };
  }
}
