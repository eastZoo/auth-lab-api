import {
  Injectable,
  HttpException,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserRepository } from './user.repository';
import { createAccessToken, createRefreshToken } from 'src/common/jwt';
import { AuthRepository } from 'src/auth/auth.repository';
import { SignupDto } from './dto/signup.dto';
import { user } from 'src/models';
import { v1 as uuid } from 'uuid';
import * as crypto from 'crypto';

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

  /**
   * 회원가입
   * @param signupDto 회원가입 항목
   */
  async signup(signupDto: SignupDto) {
    const t = await this.seqeulize.transaction();
    try {
      const isUser = await user.findOne({ where: { id: signupDto.id } });
      // 위의 조건과 같은 조건이 있다면 중복된 아이디 알림
      if (isUser?.id) {
        throw new NotAcceptableException();
      }
      signupDto.password = crypto
        .createHash('sha512')
        .update(signupDto.password)
        .digest('hex');

      const USER_OID = uuid();
      signupDto.oid = USER_OID;

      await user.create(signupDto);
      await t.commit();

      return { msg: 'success' };
    } catch (error) {
      Logger.error(error);
      await t.rollback();
      throw new HttpException('회원가입에 실패 했습니다.', 400);
    }
  }
}
