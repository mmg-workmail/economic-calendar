import moment from "jalali-moment";
import timezone from 'moment-timezone';

export function useMomment() {
  const filter = useFilter()
  function getDate(d: string) {
    const utc = filter.value.timezone 

    return timezone.utc(d).tz(utc).format("YYYY-MM-DD");
  }
  function getFullDate(d: string = '', locale = 'en') {
    const utc = filter.value.timezone 
    return timezone.utc(d).tz(utc).locale(locale).format('dddd MMMM D YYYY');
  }
  function getTime(d: string, locale = 'en') {
    const utc = filter.value.timezone 
    return timezone.utc(d).tz(utc).locale(locale).format('HH:mm')
  }

  function isPast(d: string = '') {
    let result = false
    const targetTime = moment.utc(d);

    // Get the current time
    const currentTime = moment();

    // Compare target time with current time
    if (targetTime.isBefore(currentTime)) {
      result = true
    }
    return result
  }

  function isForOneHour(d: string) {
    let result = false
    const targetTime = moment.utc(d);

    // Get the current time
    const currentTime = moment();

    // Define the end time as 1 hour from the current time
    const endTime = moment().add(1, 'hour');

    // Check if the target time falls within the next 1 hour
    if (targetTime.isBetween(currentTime, endTime)) {
      result = true
    }
    return result
  }

  function getDuration(date: string, locale = 'en') {
    const utc = filter.value.timezone 
    const now = moment();
    const d = timezone.utc(date).tz(utc);
    const diff = d.diff(now, 'minutes');
    // const duration = moment.duration(diff).locale(locale).humanize(false);
    return diff
  }

  function getDateFuture(date: string, locale = 'en') {

    let result = '';

    if (isForOneHour(date)) {
      result = getDuration(date, locale)
    } else {
      result = getTime(date, locale);
    }

    return result
  }

  function getTimeCalendar(date: string, locale = 'en') {
    let result = '';

    if (isPast(date)) {
      result = getTime(date, locale)
    } else {
      result = getDateFuture(date, locale)
    }

    return result
  }
  function getTimezoneOffset(tz: string) {
    // Get the current time in the specified timezone
    const now = timezone.tz(tz);

    // Get the offset in minutes
    const offsetMinutes = now.utcOffset();

    // Calculate the absolute offset hours and minutes
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetMins = Math.abs(offsetMinutes) % 60;

    // Determine the sign
    const sign = offsetMinutes >= 0 ? '+' : '-';

    // Format the offset with leading zeros if necessary
    const formattedOffset = `${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

    return formattedOffset;
  }
  return {
    getDate,
    getFullDate,
    getTime,
    isPast,
    isForOneHour,
    getTimeCalendar,
    getTimezoneOffset
  };
}
