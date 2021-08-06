import { injectable } from 'inversify';
import mongoose, { Connection } from 'mongoose';
import type { IParams, IMongoConnection } from './interface';

@injectable()
export default class MongoConnection implements IMongoConnection {
    private conn: Promise<Connection> | null = null;

    async fetch(params: IParams) {
        const { dbHost, dbName, ...conn } = params;
        const dbUrl = `mongodb://${dbHost}/${dbName}`;
        if (!this.conn) {
            this.conn = mongoose.createConnection(dbUrl, {
                ...conn,
            });
        }
        return this.conn;
    }
}
