import 'reflect-metadata';
import { Factory } from 'rosie';
import type { IUser } from '@interfaces/models';
import type { IExecutable } from '@interfaces/executable';
import type { IParams } from './params';
import type { IResponse } from './response';
import CreateUser from '.';

describe('CreateUser', () => {
  const {
    updatedAt, createdAt, id, ...params
  }: IUser = Factory.build('user');

  const mockUser = {
    id: 1,
  };

  const mockUserDataSource = {
    create: jest.fn(),
  };

  const mockBcryptService = {
    hash: jest.fn(),
  };


  const mockHash = 'this-is-a-hash';

  beforeEach(() => {
    mockUserDataSource.create.mockResolvedValue(mockUser);
    mockBcryptService.hash.mockReturnValue(mockHash);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const getInstance: () => IExecutable<IParams, IResponse> = () => new CreateUser(mockUserDataSource, mockBcryptService);

  it('creates a new user', async () => {
    const subject = getInstance();
    const res = await subject.execute(params);
    expect(res).toEqual(mockUser);
  });

  it('calls the bcrypt service', async () => {
    const subject = getInstance();
    await subject.execute(params);
    expect(mockBcryptService.hash).toHaveBeenCalled();
  });

  it('passes the right params to user data source', async () => {
    const subject = getInstance();
    await subject.execute(params);
    const userDataSourceParams = mockUserDataSource.create.mock.calls[0][0];
    expect(userDataSourceParams).toHaveProperty('firstName', params.firstName);
    expect(userDataSourceParams).toHaveProperty('lastName', params.lastName);
    expect(userDataSourceParams).toHaveProperty('email', params.email);
    expect(userDataSourceParams).toHaveProperty('password');
  });

  it('saves the password as a hash', async () => {
    const subject = getInstance();
    await subject.execute(params);
    const userDataSourceParams = mockUserDataSource.create.mock.calls[0][0];
    expect(userDataSourceParams).toHaveProperty('password', mockHash);
  });
});
