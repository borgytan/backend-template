import { injectable, inject } from 'inversify';
import config from 'config';
import { Knex } from 'knex';
import moment from 'moment';
import formatPgError from '@utils/postgres-err';
import Types from '@src/types';
import container from '@src/index';
import toSnakeCase from '@src/utils/to-snake-case';
import toCamelCase from '@src/utils/to-camel-case';

import type { IUserDataSource } from '@interfaces/data-sources';
import type { IUser } from '@interfaces/models';

const SCHEMA: string = config.get('database.schema');
const TABLE: string = config.get('database.tables.users');

@injectable()
export default class UserDb implements IUserDataSource {
  constructor(
      @inject(Types.Knex) private dbConn: Knex,
  ) {
  }

  async create(params: Partial<IUser>, opts: { dbConn?: Knex } = {}) {
    const dbConn: Knex = opts.dbConn || this.dbConn;

    const formattedParams: any = toSnakeCase(params);
    try {
      const res = await dbConn(`${SCHEMA}.${TABLE}`).insert(formattedParams).returning('*');
      return toCamelCase(res[0]);
    } catch (err) {
      return formatPgError(err);
    }
  }

  async truncate() {
    return this.dbConn.raw(`truncate ${SCHEMA}.${TABLE} restart identity cascade`);
  }
}
