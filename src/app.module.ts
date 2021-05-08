import { UserController } from './infrastructure/api/rest/controllers/user.controller';
import { UserService } from './domain/services/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserRepositoryTypeOrm } from './infrastructure/persistence/repositories/user.repository.type.orm';
import { UserRepository } from './domain/repositories/user.repository';
import { UserRepositoryAdapter } from './infrastructure/persistence/repositories/user.repository.adapter';

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
    TypeOrmModule.forFeature([UserRepositoryTypeOrm]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepositoryAdapter,
    { provide: UserRepository, useClass: UserRepositoryAdapter },
  ],
})
export class AppModule {}
