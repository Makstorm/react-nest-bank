import { MessageSendingResponse } from 'postmark/dist/client/models';

export interface IPostmarkService {
  sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<MessageSendingResponse>;
}
