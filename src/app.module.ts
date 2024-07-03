import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
// import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "password": "1234",
    "username": "cis",
    "entities": [Users],
    "database": "cis",
    "synchronize": true,
    "logging": true
  }), TypeOrmModule.forFeature([Users])],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule { }
