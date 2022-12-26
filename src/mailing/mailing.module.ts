import { Module } from '@nestjs/common';
import { MailingController } from './mailing.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'pivario1234@gmail.com',
          pass: 'mot de passe application lehne',
        },
      },
    }),
  ],
  controllers: [MailingController],
})
export class MailingModule {}
