import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      email: 'testname@gmail.com',
      firstName: 'testfirstName',
      lastName: 'testlastName',
      dob: new Date('1999-03-31'),
      phoneNo: '2135745212',
    };

    jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: 21,
      ...dto,
    });

    const result = await service.createUser(dto);

    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(prisma.user.create).toHaveBeenCalledWith({ data: dto });
  });
});
