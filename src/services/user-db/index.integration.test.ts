import { Factory } from 'rosie';
import type { IUserDataSource } from '@interfaces/data-sources';
import { omit } from 'lodash';
import type { IUser } from '@interfaces/models';
import Types from '@src/types';
import container from '@src/index';
import { validateUser } from '@tests/assertions';

describe('UserDb', () => {
    const userDb: IUserDataSource = container.get(Types.UserDataSource);

    describe('#create', () => {
        const params = omit(Factory.build('user') as IUser, ['updatedAt', 'createdAt', 'id']);

        afterEach(async () => {
            await userDb.truncate();
        });

        it('creates a new record in the database', async () => {
            await userDb.create(params);
        });

        it('returns the right properties', async () => {
            const res = await userDb.create(params);
            validateUser(res);
        });
    });
});
