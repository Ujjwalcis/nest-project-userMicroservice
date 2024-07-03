import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

class UpdateParams {
  id: string;
  updateUserDto: UpdateUserDto
}

class LoginUserData {
  loginUserDto: LoginUserDto;
  key: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('createUser')
  async createUserHandler(createUserDto: CreateUserDto) {
    return await this.appService.createUser(createUserDto);
  }

  @MessagePattern('loginUser')
  async loginUserHandler(loginUserData: LoginUserData) {
    return await this.appService.loginUser(loginUserData);
  }

  @MessagePattern('getUserByFilters')
  async getUsersByFilterHandler(getUserDto: GetUserDto) {
    return await this.appService.getUserByFilters(getUserDto);
  }

  @MessagePattern('updateUser')
  async updateUser(updateParams: UpdateParams) {
    const { id, updateUserDto } = updateParams
    return await this.appService.updateUser(id, updateUserDto);
  }

  @MessagePattern('deleteUser')
  async deleteUser(id: string) {
    return await this.appService.deleteUser(id);
  }
}
