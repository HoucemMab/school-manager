import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { MongoRepository } from 'typeorm';
import { SingInUserDTO } from './dtos/signinUser.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  async signup(createAuth: User): Promise<User> {
    // hash the password
    const hash = await argon.hash(createAuth.mdp);
    // save the new hashed password
    createAuth.mdp = hash;
    return this.userRepository.save(createAuth);
  }
  async signIn(signIndto: SingInUserDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({
      login: signIndto.login,
    });
    if (!user) {
      throw new ForbiddenException('User not Found .. Please Verify !');
    } else {
      // verify the password with the hashed one , argon will convert it
      const passwordVerify = argon.verify(user.mdp, signIndto.mdp);
      //delete the password from the returned object , Security tip
      delete (await user).mdp;
      return user;
    }
  }
}
