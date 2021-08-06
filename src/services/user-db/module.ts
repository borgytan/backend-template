import { ContainerModule, interfaces } from 'inversify';
import Types from '@src/types';
import schema from './schema';
import type { IMongoConnection } from '../mongo-connection/interface';
import UserDb from '.';

export default new ContainerModule((bind: interfaces.Bind) => {
    bind(Types.UserDataSource).to(UserDb);
    bind(Types.UserCollection).toFactory((context: interfaces.Context) => async (dbConfig) => {
        const mongoConnection: IMongoConnection = context.container.get(Types.MongoConnection);
        const conn = await mongoConnection.fetch(dbConfig);
        return conn.model('User', schema);
    });
});
