import {
  Injectable,
  HttpException,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserRepository } from './user.repository';
import { createAccessToken, createRefreshToken } from 'src/common/jwt';
import { AuthRepository } from 'src/auth/auth.repository';
import { SignupDto } from './dto/signup.dto';
import { user } from 'src/models';
import { v1 as uuid } from 'uuid';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';

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
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { id, password } = loginDto;

    const signinData = await user.findOne({
      where: {
        userId: id,
      },
    });
    // id 존재하는 id 인지 비교
    if (signinData === null) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    // 이메일 존재시 비밀번호 비교.
    if (
      signinData.password.toString() !==
      crypto.createHash('sha512').update(password).digest('hex')
    ) {
      throw new NotFoundException('비밀번호가 일치하지 않습니다.');
    }

    const payload = {
      oid: signinData.oid,
      userId: signinData.userId,
      name: signinData.name,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    console.log(accessToken, refreshToken);
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  /**
   * 회원가입
   * @param signupDto 회원가입 항목
   */
  async signup(signupDto: SignupDto) {
    const t = await this.seqeulize.transaction();
    try {
      console.log(signupDto);
      const isUser = await user.findOne({ where: { userId: signupDto.id } });
      // 위의 조건과 같은 조건이 있다면 중복된 아이디 알림
      if (isUser?.id) {
        throw new NotAcceptableException('이미 존재하는 아이디입니다.');
      }

      // 비밀번호 암호화
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
      throw new HttpException(error.response.message, 400);
    }
  }
}
