import { Module } from '@nestjs/common';
import { LocationGateway } from './location.gateway';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [LocationGateway],
})
export class LocationModule {}
