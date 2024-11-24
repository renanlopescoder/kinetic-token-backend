import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('service and repository should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        email: 'kinetic@test.com',
        password: 'hashedPassword',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(userRepository, 'create').mockReturnValue(mockUser as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser as User);

      const result = await userService.register(
        'kinetic@test.com',
        'password123',
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'kinetic@test.com' },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'kinetic@test.com',
        password: 'hashedPassword',
      });
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should throw a ConflictException if user already exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        email: 'kinetic@test.com',
      } as User);

      await expect(
        userService.register('kinetic@test.com', 'password123'),
      ).rejects.toThrow(ConflictException);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'kinetic@test.com' },
      });
    });
  });

  describe('validateUser', () => {
    it('should validate user with correct credentials', async () => {
      const mockUser = {
        email: 'kinetic@test.com',
        password: 'hashedPassword',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await userService.validateUser(
        'kinetic@test.com',
        'password123',
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'kinetic@test.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      );
      expect(result).toEqual(mockUser);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(
        userService.validateUser('nonexistent@test.com', 'password123'),
      ).rejects.toThrow(NotFoundException);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@test.com' },
      });
    });

    it('should throw an UnauthorizedException if password is incorrect', async () => {
      const mockUser = {
        email: 'kinetic@test.com',
        password: 'hashedPassword',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        userService.validateUser('kinetic@test.com', 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'kinetic@test.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongPassword',
        'hashedPassword',
      );
    });
  });
});
