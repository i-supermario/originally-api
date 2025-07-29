import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service';

@WebSocketGateway({ cors: true })
export class LocationGateway {
  @WebSocketServer() server: Server;

  constructor(private redisService: RedisService) {}

  @SubscribeMessage('join-group')
  async handleJoin(
    @MessageBody() data: { groupId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(data.groupId);
    client.data.groupId = data.groupId;
    // client.data.userId = data.userId;
    console.log(`${data.userId} joined group ${data.groupId}`);
  }

  @SubscribeMessage('update-location')
  async handleLocationUpdate(
    @MessageBody() data: { userId: string; groupId: string; lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('receiving location updates', data);
    const { groupId, userId, lat, lng } = data;
    if (!groupId || !userId) return;

    await this.redisService.setLocation(groupId, userId, { lat, lng });
    const allLocations = await this.redisService.getGroupLocations(groupId);

    this.server.to(groupId).emit('group-location-update', allLocations);
  }
}
