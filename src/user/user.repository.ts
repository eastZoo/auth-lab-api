import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserRepository {
  constructor(private readonly sequelize: Sequelize) {}
}
