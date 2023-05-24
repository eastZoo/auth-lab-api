import { Controller } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Controller('user')
export class UserRepository {
  constructor(private readonly sequelize: Sequelize) {}
}
