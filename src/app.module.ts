import { UserController } from "./infrastructure/api/rest/controllers/user.controller";
import { UserService } from "./domain/services/user.service";
import { AuthService } from "./domain/services/auth.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepositoryTypeOrm } from "./infrastructure/persistence/repositories/user.repository.type.orm";
import { UserRepository } from "./domain/repositories/user.repository";
import { UserRepositoryAdapter } from "./infrastructure/persistence/repositories/user.repository.adapter";
import { PassportModule } from "@nestjs/passport";
import { LoginController } from "./infrastructure/api/rest/controllers/login.controller";
import { JwtModule } from "@nestjs/jwt";
import { RoleRepositoryTypeOrm } from "./infrastructure/persistence/repositories/role.repository.type.orm";
import { LocalStrategy } from "./infrastructure/api/rest/authentication/strategies/local.strategy";
import { JwtStrategy } from "./infrastructure/api/rest/authentication/strategies/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UserRepositoryTypeOrm, RoleRepositoryTypeOrm]),
    PassportModule,
    JwtModule.register({
      secret: 'secret', //meter en una variable de entorno
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UserController, LoginController],
  providers: [
    UserService,
    UserRepositoryAdapter,
    { provide: UserRepository, useClass: UserRepositoryAdapter },
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AppModule {}
