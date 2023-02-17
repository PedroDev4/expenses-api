import { IMailProvider } from './IMailProvider';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EtherealMailProvider implements IMailProvider {
  constructor(private mailService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const template_file_content = fs.readFileSync(path).toString('utf-8');

    const templateParsed = handlebars.compile(template_file_content);

    const templateHTML = templateParsed(variables);

    const message = await this.mailService.sendMail({
      to,
      from: 'Onfly Test <noreply@onflytest.com.br>',
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
