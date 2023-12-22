import { IPostmarkService } from '@domain';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postmark from 'postmark';

@Injectable()
export class PostmarkService implements IPostmarkService {
  private client: postmark.ServerClient;

  public constructor(private readonly configService: ConfigService) {
    this.client = new postmark.ServerClient(
      this.configService.getOrThrow('POSTMARK_APP_TOKEN'),
    );
  }
  async sendEmail(to: string, subject: string, content: string) {
    const email = {
      From: 'maksim.gorobecz@maksondomen.online',
      To: to,
      Subject: subject,
      HtmlBody: content,
    };

    try {
      return await this.client.sendEmail(email);
    } catch (error) {
      console.log(error.message);
    }
  }
}
