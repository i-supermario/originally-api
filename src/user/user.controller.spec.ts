import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test } from '@nestjs/testing';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userService = moduleRef.get(UserService);
    userController = moduleRef.get(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create new user', async () => {
      const dto = {
        email: 'testname@gmail.com',
        firstName: 'testfirstName',
        lastName: 'testlastName',
        dob: new Date('1999-03-31'),
        phoneNo: '2135745212',
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue({
        id: 2,
        ...dto,
      });

      expect(await userController.signUpUser(dto)).toEqual({
        id: expect.any(Number),
        ...dto,
      });
    });
  });
});
