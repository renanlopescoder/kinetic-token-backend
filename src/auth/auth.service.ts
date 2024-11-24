import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: User): Promise<string> {
    if (!user || !user.email || !user.id || !user.password) {
      throw new TypeError(
        'Invalid user object: email, id, and password are required',
      );
    }

    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
