export interface IBcrypt {
    hash: (
        { text, saltRounds }: {
            text: string;
            saltRounds: number;
        }) => Promise<string>;

    compare: (
        { text, hash }: {
            text: string;
            hash: string;
        }) => Promise<boolean>;

}
