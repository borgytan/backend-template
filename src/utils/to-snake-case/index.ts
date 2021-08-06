import { get, snakeCase } from 'lodash';
import { IParams } from './params';

export default function toSnakeCase(params: IParams): object {
    const keys = Object.keys(params);
    const formattedParams: any = {};
    keys.forEach((key: string) => {
        const formattedKey: string = snakeCase(key);
        let value = get(params, key);
        if (typeof value === 'object') {
            value = toSnakeCase(value);
        }
        formattedParams[formattedKey] = value;
    });
    return formattedParams;
}
