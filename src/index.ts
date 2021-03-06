import 'reflect-metadata';
import { Container } from 'inversify';
import serviceContainer from './services';
import observerContainer from './observers';
import featureContainer from './features';

const tempContainer = Container.merge(serviceContainer, observerContainer);
const appContainer = Container.merge(featureContainer, tempContainer);

export default appContainer;
