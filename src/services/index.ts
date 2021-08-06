import { Container } from 'inversify';
import userdbModule from './user-db/module';
import Bcrypt from './bcrypt';
import MongoConnection from './mongo-connection';
import JwtService from './jwt';
import Types from '../types';

const container = new Container();
container.load(userdbModule);

container.bind(Types.Bcrypt).to(Bcrypt);
container.bind(Types.MongoConnection).to(MongoConnection).inSingletonScope();
container.bind(Types.JwtService).to(JwtService);

export default container;
