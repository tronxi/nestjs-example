import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    MailModule,
    ConfigModule.forRoot({
        isGlobal: true
      }
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
