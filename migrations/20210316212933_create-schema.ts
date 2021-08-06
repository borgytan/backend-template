import { Knex } from 'knex';
import config from 'config';


export async function up(knex: Knex): Promise<void> {
  const schema = config.get('database.schema');
  return knex.raw(`create schema ${schema}`);
}


export async function down(knex: Knex): Promise<void> {
  const schema = config.get('database.schema');
  return knex.raw(`drop schema ${schema}`);
}
