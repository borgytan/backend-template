import { injectable } from 'inversify';
import { addMinutes } from 'date-fns';
import type { IDateService } from './interface';

@injectable()
export default class DateService implements IDateService {
  now() {
    return new Date();
  }

  minsFromNow(mins: number) {
    return addMinutes(new Date(), mins);
  }
}
