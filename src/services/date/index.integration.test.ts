import { differenceInMinutes } from 'date-fns';
import type { IDateService } from './interface';
import container from '../..';
import Types from '../../types';
import DateService from '.';

describe('DateService', () => {
  const minsFromNow = 5;
  describe('#minsFromNow', () => {
    it('returns a date x minutes later', () => {
      const dateService: IDateService = container.get(Types.DateService);
      const now = new Date();
      const date = dateService.minsFromNow(minsFromNow);
      const diff = differenceInMinutes(date, now);
      expect(diff).toEqual(minsFromNow);
    });
  });
});
