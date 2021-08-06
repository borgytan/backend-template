import { get, camelCase } from 'lodash';
import { IParams } from './params';

export default (params: IParams) => {
    const keys = Object.keys(params);
    const formattedParams: any = {};
    keys.forEach((key: string) => {
        const formattedKey: string = camelCase(key);
        formattedParams[formattedKey] = get(params, key);
    });
    return formattedParams;
};
