import { injectable, inject } from 'inversify';
import config from 'config';
import { Model } from 'mongoose';
import Types from '@src/types';

import type { IUserDataSource } from '@interfaces/data-sources';
import type { IUser } from '@interfaces/models';

const DB_NAME = config.get('database.name');
const DB_HOST = config.get('database.host');
const DB_UNAME = config.get('database.user');
const DB_PASS = config.get('database.password');

const CONNECTION_OPTS: any = config.get('database.connection');

@injectable()
export default class UserDb implements IUserDataSource {
    constructor(
      @inject(Types.UserCollection) private userModelFactory: (dbConfig: any) => Model<any, any>,
    ) {
    }

    async create(params: Partial<IUser>): Promise<IUser> {
        const UserCollection = await this.userModelFactory({
            dbHost: DB_HOST,
            dbName: DB_NAME,
            user: DB_UNAME,
            pass: DB_PASS,
            ...CONNECTION_OPTS,

        });
        const user = new UserCollection(params);
        const res = await user.save();
        return {
            ...res._doc,
            id: res._doc._id,
        };
    }

    async truncate() {
        const UserCollection = await this.userModelFactory({
            dbHost: DB_HOST,
            dbName: DB_NAME,
            user: DB_UNAME,
            pass: DB_PASS,
            ...CONNECTION_OPTS,

        });
        return UserCollection.deleteMany();
    }
}
