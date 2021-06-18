import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./domain/services/user.service";
import { UserRepositoryAdapter } from "./infrastructure/persistence/repositories/user.repository.adapter";
import { UserRepository } from "./domain/repositories/user.repository";
import { LoginController } from "./infrastructure/api/rest/controllers/login.controller";
import { UserController } from "./infrastructure/api/rest/controllers/user.controller";
import { UserRepositoryTypeOrm } from "./infrastructure/persistence/repositories/user.repository.type.orm";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./domain/services/auth.service";
import { LocalStrategy } from "./infrastructure/api/rest/authentication/strategies/local.strategy";
import { JwtStrategy } from "./infrastructure/api/rest/authentication/strategies/jwt.strategy";
import { RoleRepositoryTypeOrm } from "./infrastructure/persistence/repositories/role.repository.type.orm";
import { MailModule } from "src/mail/mail.module";

@Module({
  imports: [
    MailModule,
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
export class UsersModule {}
