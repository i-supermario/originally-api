import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private redis = new Redis();

  async setLocation(groupId: string, userId: string, location: any) {
    await this.redis.hset(
      `group:${groupId}:locations`,
      userId,
      JSON.stringify(location),
    );
  }

  async getGroupLocations(groupId: string) {
    const locations = await this.redis.hgetall(`group:${groupId}:locations`);
    return Object.entries(locations).map(([userId, loc]) => ({
      userId,
      ...JSON.parse(loc),
    }));
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }
}
