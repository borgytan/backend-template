export { IUserDataSource } from './user';

export interface IDataSource {
    truncate: () => Promise;
}
