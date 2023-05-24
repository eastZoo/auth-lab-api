import { Controller } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';

@Controller('auth')
export class AuthRepository {
  constructor(private readonly sequelize: Sequelize) {}

  /**
   * 아이디 비밀번호로 유저정보 조회
   * @param {string} userId 아이디
   * @param {string} password 비밀번호
   * @returns {userAttributes} 유저정보
   */
  async validateUser(userId: string, password: string) {
    const users = await this.sequelize.query(
      `
        SELECT user_id AS userId
             , name
          FROM USER  
         WHERE user_id = '${userId}'
           AND AES_DECRYPT(password, SHA2('${process.env.SECRET_KEY}', 512)) ='${password}';
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      },
    );

    return users[0];
  }
}
