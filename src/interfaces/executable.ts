export interface IExecutable<IParams, IResult> {
    execute: (
        params: IParams,
    ) => IResult;
}
