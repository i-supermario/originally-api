import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('****************REQUEST*****************');
    console.log('Route', req.url);
    console.log('Method', req.method);
    console.log('Body', req.body);
    next();
  }
}
