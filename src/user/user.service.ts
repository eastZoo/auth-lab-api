import { Injectable, HttpException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserRepository } from './user.repository';
import { createAccessToken, createRefreshToken } from 'src/common/jwt';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly seqeulize: Sequelize,
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  /**
   * 로그인
   * @param {string} userId 아이디
   * @param {string} password 비밀번호
   */
  async login(
    id: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authRepository.validateUser(id, password);
    if (!user) {
      throw new HttpException(
        '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.',
        400,
      );
    }
    const payload = {
      userId: id,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    return { accessToken, refreshToken };
  }
}
