import { injectable, unmanaged } from 'inversify';
import type { Schema } from '@hapi/joi';
import type { IExecutable } from '../interfaces/executable';
import JoiUtil from '../utils/joi';
import AppError from '../utils/error';

@injectable()
export default abstract class AbstractFeature<IParams, IResponse>
implements IExecutable<IParams, IResponse> {
    protected schema: Schema;

    constructor(
        @unmanaged() schema: Schema,
    ) {
        this.schema = schema;
    }

    protected sanitize(params: IParams): IParams {
        return params;
    }

    protected validate(params: IParams) {
        const errs = JoiUtil.validate(params, this.schema);

        if (errs.length) {
            throw new AppError({
                code: 'ValidationError',
                message: 'Validation error',
                details: errs,
            });
        }
    }

    protected abstract process(params: IParams, opts?: any): IResponse;

    public execute(params: IParams, opts?: any) {
        this.validate(params);
        const sanitizedParams = this.sanitize(params);

        return this.process(sanitizedParams, opts);
    }
}
