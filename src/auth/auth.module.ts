import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [PassportModule],
  providers: [
    AuthService,
    AuthRepository,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthRepository,
    UserRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
