import { User } from 'src/user/user.entity';
import { UserService } from './../user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SingInUserDTO } from './dtos/signinUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() user: User): Promise<User> {
    return this.authService.signup(user);
  }
  @Post('signIn')
  async signIn(@Body() signInUserDTO: SingInUserDTO) {
    return this.authService.signIn(signInUserDTO);
  }
}
