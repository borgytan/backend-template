import container from '@src/index';
import Types from '@src/types';
import type { IUser } from '@interfaces/models';
import type { IUserDataSource } from '@interfaces/data-sources';
import type { IExecutable } from '@interfaces/executable';
import { IParams } from './params';
import { IResponse } from './response';
import { Factory } from 'rosie';

describe('CreateUser', () => {
  const userDb: IUserDataSource = container.get(Types.UserDataSource);

  const {
    updatedAt, createdAt, id, ...params
  }: IUser = Factory.build('user');

  const subject: IExecutable<IParams, IResponse> = container.get(Types.CreateUser);

  afterEach(async () => {
    await userDb.truncate();
  });

  it('creates a new user', async () => {
    const res = await subject.execute(params);
    expect(res).toBeTruthy();
  });
});
