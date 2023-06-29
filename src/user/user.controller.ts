import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtRefreshGuard } from 'src/auth/guards/jwt-refresh.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const result = await this.userService.login(loginDto);
    return result;
  }

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.userService.signup(signupDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh-token')
  async refreshToken(@Req() req: any) {
    const { userId } = req.user;
    const accessToken = await this.authService.getNewAcessToken(userId);
    return { accessToken };
  }
}
