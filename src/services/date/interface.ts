export interface IDateService {
    now: () => Date;
    minsFromNow: (mins: number) => Date;
}
