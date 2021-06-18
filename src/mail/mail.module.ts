import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.upm.es",
        port: "587",
        secure: false,
        auth: {
          user: 'sergio.gsanchez@alumnos.upm.es',
          pass: '',
        },
      },
      defaults: {
        from: '"Sergio García" <sergio.gsanchez@alumnos.upm.es>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService]

})
export class MailModule {}
