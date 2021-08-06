import { injectable, inject } from 'inversify';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from 'config';
import { IJwtService } from './interface';
import AppError from '../../utils/error';

@injectable()
export default class JwtService implements IJwtService {
  encode({ expiry, json, key }: { json: { [key: string]: any }, expiry: Date, key: string}) {
    const expiryInSeconds = moment(expiry).diff(moment(), 'seconds');
    return jwt.sign(json, key, { expiresIn: expiryInSeconds });
  }

  decode({ hash, key }: { hash: string, key: string }) {
    try {
      return jwt.verify(hash, key);
    } catch (err) {
      throw new AppError({
        code: err.name,
        message: err.message,
      });
    }
  }
}
