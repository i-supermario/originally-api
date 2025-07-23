import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('****************REQUEST*****************');
    console.log('Route', req.url);
    console.log('Method', req.method);
    console.log('Body', req.body);
    console.log('Query Params', req.query);
    console.log('Params', req.params);
    console.log('Cookies', req.cookies);
    next();
  }
}
