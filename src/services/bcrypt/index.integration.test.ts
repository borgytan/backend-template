import randomstring from 'randomstring'; // eslint-disable-line
import config from 'config';
import bcrypt from 'bcrypt';
import type { IBcrypt } from './interface';
import container from '../..';
import Types from '../../types';

const saltRounds: number = config.get('app.bcryptSaltRounds');

describe('BcryptService', () => {
    it('hashes a text', async () => {
        const bcryptService: IBcrypt = container.get(Types.Bcrypt);
        const text = randomstring.generate();
        const hash = await bcryptService.hash({ text, saltRounds });

        const matched = await bcrypt.compare(text, hash);
        expect(matched).toEqual(true);
    });

    it('compares a text to its hash', async () => {
        const bcryptService: IBcrypt = container.get(Types.Bcrypt);
        const text = randomstring.generate();
        const hash = await bcrypt.hash(text, saltRounds);

        const matched = await bcryptService.compare({ text, hash });
        expect(matched).toEqual(true);
    });
});
