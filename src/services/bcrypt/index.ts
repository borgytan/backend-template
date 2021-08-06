import { injectable } from 'inversify';
import bcrypt from 'bcrypt';
import type { IBcrypt } from './interface';

export { IBcrypt };


@injectable()
export default class BcryptService implements IBcrypt {
  hash({ text, saltRounds }: { text: string; saltRounds: number }) {
    return bcrypt.hash(text, saltRounds);
  }

  compare({ text, hash }: { text: string; hash: string }) {
    return bcrypt.compare(text, hash);
  }
}
