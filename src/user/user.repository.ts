import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { user } from 'src/models';

@Injectable()
export class UserRepository {
  constructor(private readonly sequelize: Sequelize) {}

  /**
   * 유저 단일 정보조회
   * @param userId
   * @returns
   */
  async selectOne(options: any) {
    console.log(options);
    return await user.findOne({ where: { userId: options } });
  }
}
