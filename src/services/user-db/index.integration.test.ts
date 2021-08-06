import config from 'config';
import { Factory } from 'rosie';
import { Knex } from 'knex';
import type { IUserDataSource } from '@interfaces/data-sources';
import type { IUser } from '@interfaces/models';
import Types from '@src/types';
import container from '@src/index';
import { validateUser } from '@tests/assertions';
import UserDb from '.';

const SCHEMA = config.get('database.schema');
const TABLE = config.get('database.tables.users');

describe('UserDb', () => {
  const dbConn: Knex = container.get(Types.Knex);
  const userDb: IUserDataSource = container.get(Types.UserDataSource);

  describe('#create', () => {
    const {
      updatedAt, createdAt, id, ...rest
    } = <IUser> Factory.build('user');
    const params = rest;

    afterEach(async () => {
      await userDb.truncate();
    });

    it('creates a new record in the database', async () => {
      await userDb.create(params);
      const res = await dbConn(`${SCHEMA}.${TABLE}`).select('*');
      expect(res.length).toBeTruthy();
    });

    it('returns the right properties', async () => {
      const res = await userDb.create(params);
      validateUser(res);
    });
  });
});
