import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';

@Injectable()
export class AuthRepository {
  constructor(private readonly sequelize: Sequelize) {}

  /**
   * 아이디 비밀번호로 유저정보 조회
   * @param {string} userId 아이디
   * @param {string} password 비밀번호
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

  /** 비밀번호 암호화 */
  async encryptPassword(password: string) {
    const hash: any = await this.sequelize.query(
      `
        SELECT
          AES_ENCRYPT('${password}', SHA2('${process.env.SECRET_KEY}', 512)) AS password;
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      },
    );
    return hash[0].password;
  }
}
