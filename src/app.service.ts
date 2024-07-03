import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

class LoginUserData {
  loginUserDto: LoginUserDto;
  key: string;
}

@Injectable()
export class AppService {

  constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) { }

  @Inject() private readonly jwtService: JwtService;

  async createUser(newUser: Users) {
    let user: Users = new Users();

    user = newUser;

    const saltCount = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltCount);

    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async loginUser(loginUserData: LoginUserData) {
    const { userName, password } = loginUserData.loginUserDto;
    const key = loginUserData.key;
    let userFound = await this.userRepository.findOne({ where: { userName: userName } })

    if (!userFound) {
      return new NotFoundException()
    }

    const isVerified = await bcrypt.compare(password, userFound.password);

    if (isVerified) {
      const payload = { id: userFound.id, role: userFound.role };
      const token = this.jwtService.sign(payload, { secret: key, expiresIn: '1h' });

      return token;
    }

    return 0;

  }

  async getUserByFilters(getUserDto: GetUserDto) {

    let findQuery: any = {
      id: getUserDto.id,
      userName: getUserDto.userName,
      email: getUserDto.email,
      age: getUserDto.age,
      isAlive: getUserDto.isAlive
    }
    return await this.userRepository.find({
      where: findQuery,
      order: {
        id: 'ASC',
        userName: "ASC",
        age: "ASC"
      },
      take: 20
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
