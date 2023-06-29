import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthRepository } from 'src/auth/auth.repository';
import { user } from 'src/models';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [SequelizeModule.forFeature([user])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, UserRepository, AuthRepository, AuthService],
})
export class UserModule {}
