import config from 'config';
import {
  camelCase,
} from 'lodash';
import AppError from '../error';
import { IPgError } from './pg-err';

const NOT_NULL_ERR_CODE: string = config.get('database.postgresErrors.notNull.code');
const UNIQUE_ERR_CODE: string = config.get('database.postgresErrors.unique.code');
const FOREIGN_KEY_ERR_CODE: string = config.get('database.postgresErrors.foreignKey.code');

const FK_CONSTRAINTS: { [key: string]: any } = config.get('database.postgresErrors.foreignKey.tables');

export default (err: IPgError) => {
  switch (err.code) {
    case FOREIGN_KEY_ERR_CODE: {
      const constraints: { [key: string]: { [k: string]: string } } = FK_CONSTRAINTS[err.table];
      throw new AppError({
        code: 'ForeignKeyError',
        message: err.message,
        details: {
          prop: constraints[err.constraint],
        },
      });
    }
    case UNIQUE_ERR_CODE: {
      throw new AppError({
        code: 'UniqueConstraintError',
        message: err.message,
        details: {
          prop: camelCase(err.column),
        },
      });
    }
    case NOT_NULL_ERR_CODE: {
      throw new AppError({
        code: 'NotNullError',
        message: err.message,
        details: {
          prop: camelCase(err.column),
        },
      });
    }
    default: {
      throw err;
    }
  }
};
