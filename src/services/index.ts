import { Container } from 'inversify';
import { Pool } from 'pg';
import Knex from 'knex';
import config from 'config';
import Bcrypt from './bcrypt';
import DateService from './date';
import UserDb from './user-db';
import JwtService from './jwt';
import Types from '../types';

const container = new Container();

const knex = Knex({
  client: 'pg',
  connection: {
    host: config.get('database.connection.host'),
    user: config.get('database.connection.user'),
    database: config.get('database.name'),
    password: config.get('database.connection.password'),
  },
});

container.bind(Types.UserDataSource).to(UserDb);

container.bind(Types.Knex).toConstantValue(knex);
container.bind(Types.Bcrypt).to(Bcrypt);
container.bind(Types.DateService).to(DateService);
container.bind(Types.JwtService).to(JwtService);

export default container;
