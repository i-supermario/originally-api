import { Injectable } from '@nestjs/common';
import { Session, SessionStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) {}

  async createSession(userId: number): Promise<Session> {
    return this.prismaService.session.create({
      data: {
        userId: userId,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: SessionStatus.ACTIVE,
      },
    });
  }

  async findActiveSessionByUserId(userId: number): Promise<Session | null> {
    return this.prismaService.session.findFirst({
      where: {
        userId: userId,
        status: SessionStatus.ACTIVE,
      },
    });
  }

  async extendSessionTimeBy(
    sessionId: number,
    duration: number = 24 * 60 * 60 * 1000,
  ): Promise<Session> {
    return this.prismaService.session.update({
      where: {
        id: sessionId,
        status: SessionStatus.ACTIVE,
      },
      data: {
        expiresAt: new Date(Date.now() + duration),
      },
    });
  }

  async closeActiveSession(sessionId: number) {
    return this.prismaService.session.update({
      where: {
        id: sessionId,
      },
      data: {
        status: SessionStatus.INACTIVE,
      },
    });
  }
}
