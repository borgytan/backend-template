import { Connection } from 'mongoose';
import container from '@src/index';
import Types from '@src/types';
import config from 'config';
import type { IMongoConnection } from './interface';

const DB_NAME = config.get('database.name');
const DB_HOST = config.get('database.host');
const DB_UNAME = config.get('database.user');
const DB_PASS = config.get('database.password');

const CONNECTION_OPTS: any = config.get('database.connection');

describe('MongoConnectionService', () => {
    const params = {
        dbHost: DB_HOST,
        dbName: DB_NAME,
        user: DB_UNAME,
        pass: DB_PASS,
        ...CONNECTION_OPTS,
    };

    it('returns a mongodb connection', async () => {
        const subject: IMongoConnection = container.get(Types.MongoConnection);
        const res = await subject.fetch(params);
        expect(res).toBeInstanceOf(Connection);
    });

    it('reuses the same connection on succeeding calls', async () => {
        const subject: IMongoConnection = container.get(Types.MongoConnection);
        const promises = [
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
            subject.fetch(params),
        ];

        const conns = await Promise.all(promises);
        conns.forEach((conn1) => {
            conns.forEach((conn2) => {
                expect(conn1).toEqual(conn2);
            });
        });
    });
});
