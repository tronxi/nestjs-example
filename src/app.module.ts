import { UserController } from './infrastructure/controllers/user.controller';
import { UserService } from './domain/services/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserPersistence } from './domain/persistence/user.persistence';
import { UserDao } from './infrastructure/repositories/user.dao';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'pass',
      database: 'test',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController, AppController],
  providers: [
    UserService,
    AppService,
    UserDao,
    { provide: UserPersistence, useClass: UserDao },
  ],
})
export class AppModule {}
