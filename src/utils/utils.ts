import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


/* UTC日付をJSTにして返す */
export const jstDatetime = (utcDatetime: string, format: string = 'YYYY-MM-DDTHH:mm:ssZ[Z]') => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return dayjs.utc(utcDatetime).tz('Asia/Tokyo').format(format);
};