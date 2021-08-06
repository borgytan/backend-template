import { injectable, inject } from 'inversify';
import config from 'config';
import type { IUserDataSource } from '@interfaces/data-sources';
import Types from '@src/types';
import type { IBcrypt } from '@src/services/bcrypt/interface';
import AbstractExecutable from '../abstract';
import type { IParams } from './params';
import type { IResponse } from './response';
import schema from './schema';

const SALT_ROUNDS: number = config.get('app.bcryptSaltRounds');

@injectable()
export default class CreateUser extends AbstractExecutable<IParams, IResponse> {
  constructor(
    @inject(Types.UserDataSource) private userDataSource: Pick<IUserDataSource, 'create'>,
    @inject(Types.Bcrypt) private bcrypt: Pick<IBcrypt, 'hash'>,
  ) {
    super(schema);
  }

  async process(params: IParams) {
    const hash = await this.bcrypt.hash({
      text: params.password,
      saltRounds: SALT_ROUNDS,
    });
    return this.userDataSource.create({
      ...params,
      password: hash,
    });
  }
}
