import { OnModuleDestroy } from '@nestjs/common';
export declare class RedisService implements OnModuleDestroy {
    private redis;
    setLocation(groupId: string, userId: string, location: any): Promise<void>;
    getGroupLocations(groupId: string): Promise<any[]>;
    onModuleDestroy(): Promise<void>;
}
