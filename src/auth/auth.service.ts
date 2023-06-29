import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createAccessToken } from 'src/common/jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async getNewAcessToken(userId: string) {
    const user = await this.userRepository.selectOne(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      oid: user.oid,
      userId: user.userId,
      name: user.name,
    };

    return createAccessToken(payload);
  }
}
