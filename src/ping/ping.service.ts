import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PingService {
  @Cron('*/8 * * * *')
  async healthPing() {
    console.log(new Date().toISOString());
    try {
      const url =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/health'
          : 'https://origin-ally-api.onrender.com/health';
      const response = await fetch(url);
      if (response.ok) {
        console.log('Health check passed');
      } else {
        console.error('Health check failed');
      }
    } catch (error) {
      console.error('Error occurred while checking health:', error);
    }
  }
}
