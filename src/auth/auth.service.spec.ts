import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockValidJwtToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('Services should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('generateJwt', () => {
    it('should generate valid JWT token for valid user', async () => {
      const mockUser: User = {
        id: '1',
        email: 'renanlopes@test.com',
        password: 'test',
      };
      const expectedPayload = { email: mockUser.email, sub: mockUser.id };

      const token = await authService.generateJwt(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith(expectedPayload);
      expect(token).toBe('mockValidJwtToken');
    });

    it('should throw an error if user is null', async () => {
      await expect(
        authService.generateJwt(null as unknown as User),
      ).rejects.toThrow(
        'Invalid user object: email, id, and password are required',
      );
    });

    it('should throw an error if user email or id is missing', async () => {
      const incompleteUser: Partial<User> = {
        email: null,
        id: '1',
        password: 'test',
      };

      await expect(
        authService.generateJwt(incompleteUser as User),
      ).rejects.toThrow(
        'Invalid user object: email, id, and password are required',
      );
    });

    it('should throw an error if JwtService.sign fails', async () => {
      jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        throw new Error('JWT signing failed');
      });

      const mockUser: User = {
        id: '1',
        email: 'renanlopes@test.com',
        password: 'test',
      };

      await expect(authService.generateJwt(mockUser)).rejects.toThrow(
        'JWT signing failed',
      );

      jest.spyOn(jwtService, 'sign').mockReturnValue('mockValidJwtToken');
    });
  });
});
