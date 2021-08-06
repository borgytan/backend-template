import { IUser } from '@interfaces/models';

type IOmmitted = 'id' | 'createdAt' | 'updatedAt'

export type IParams = Omit<IUser, IOmmitted> & {
}
