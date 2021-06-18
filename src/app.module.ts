import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    UsersModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
