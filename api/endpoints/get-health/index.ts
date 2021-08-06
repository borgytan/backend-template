import type { Request, Response } from 'express';
import config from 'config';

const greetingConfig = config.get('app.greetingsRes');

export default async (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        data: greetingConfig,
    });
};
