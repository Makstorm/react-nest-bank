import { Request } from 'express';
import { UserDocument } from '../../entities';

export interface RequestWithUser extends Request {
  user: UserDocument;
}
