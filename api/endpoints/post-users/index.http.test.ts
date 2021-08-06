import request from 'supertest';
import { omit } from 'lodash';
import container from '@src/index';
import Types from '@src/types';
import { Factory } from 'rosie';
import { IUserDataSource } from '@src/interfaces/data-sources';
import { validateUser } from '@tests/assertions';

import app from '../..';

const URL = '/users';

describe('POST /users', () => {
    const employeeDataSource: IUserDataSource = container.get(Types.UserDataSource);

    const user = omit(
        Factory.build('user'), ['id', 'createdAt', 'updatedAt'],
    );

    const params = {
        ...user,
    };

    beforeEach(async () => {
        await employeeDataSource.truncate();
    });

    it('creates a new user', async () => {
        const { body } = await request(app)
            .post(URL)
            .send(params)
            .expect(200);

        expect(body).toHaveProperty('status', 'success');
        validateUser(body.data);
    });

    Object.keys(params).forEach((key) => {
        const invalidParams: any = {
            ...params,
        };
        delete invalidParams[key];
        it(`fails when ${key} is not present`, async () => {
            const { body } = await request(app)
                .post(URL)
                .send(invalidParams)
                .expect(200);

            expect(body).toHaveProperty('status', 'failed');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('code', 'ValidationError');
        });
    });
});
