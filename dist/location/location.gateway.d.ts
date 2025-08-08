import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service';
export declare class LocationGateway {
    private redisService;
    server: Server;
    constructor(redisService: RedisService);
    handleJoin(data: {
        groupId: string;
        userId: string;
    }, client: Socket): Promise<void>;
    handleLocationUpdate(data: {
        userId: string;
        groupId: string;
        lat: number;
        lng: number;
    }, client: Socket): Promise<void>;
}
