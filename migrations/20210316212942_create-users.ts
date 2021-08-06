import { Knex } from 'knex';
import config from 'config';

const schema = config.get('database.schema');
const table = config.get('database.tables.users');


export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    create table ${schema}.${table}(
      id int generated always as identity unique not null primary key,
      first_name text not null,
      last_name text not null,
      email text not null,
      password text not null,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
    )
  `);
}


export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop table ${schema}.${table}
  `);
}
