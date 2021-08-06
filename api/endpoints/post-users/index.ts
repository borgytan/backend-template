import type { Request, Response } from 'express';
import container from '@src/index';
import Types from '@src/types';

const createUser: any = container.get(Types.CreateUser);

export default async (req: Request & { currentUserId?: number }, res: Response) => {
    const params = req.body;
    try {
        const user = await createUser.execute({
            ...params,
        });

        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (err) {
        res.status(200).json({
            status: 'failed',
            data: err,
        });
    }
};
