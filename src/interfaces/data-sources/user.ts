import type { IDataSource } from '.';
import type { IUser } from '../models';

export interface IUserDataSource extends IDataSource {
    create: (params: Partial<IUser>, opts?: any) => Promise<IUser>;
}
