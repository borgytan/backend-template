export interface IJwtService {
    encode: (params: { json: object; key: string; expiry: Date }) => string;
    decode: (params: { hash: string; key: string }) => object | string;
}
