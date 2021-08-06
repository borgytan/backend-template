import type { Connection } from 'mongoose';

export interface IParams {
    dbHost: string;
    dbName: string;
    user: string;
    pass: string;
    [key: string]: any;
}

export interface IMongoConnection {
    fetch: (params: IParams) => Promise<Connection>;
}
