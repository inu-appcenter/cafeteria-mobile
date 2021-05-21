import moment from 'moment';

export function formatElapsedDate(timestamp: number) {
  const then = moment(timestamp);
  const now = moment();
  const duration = moment.duration(moment().diff(then));

  if (duration.seconds() < 60) {
    return '방금';
  } else if (duration.minutes() < 60) {
    return `${duration.minutes()}분 전`;
  } else if (duration.hours() < 24) {
    return `${duration.hours()}시간 전`;
  } else if (duration.days() < 2) {
    return '어제';
  } else if (duration.days() < 7) {
    return `${then.format('dddd')}`;
  } else if (then.year() === now.year()) {
    return then.format('MM/DD');
  } else {
    return then.format('YYYY/MM/DD');
  }
}
