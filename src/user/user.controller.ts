import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { id, password } = loginDto;
    return await this.userService.login(id, password);
  }
}
