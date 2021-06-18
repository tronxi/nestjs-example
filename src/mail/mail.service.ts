import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async send(to: string, password: string) {

    await this.mailerService.sendMail({
      to: to,
      subject: 'Ese mailcito rico',
      template: './mailTemplate',
      context: {
        password: password
      },
    });
  }
}
