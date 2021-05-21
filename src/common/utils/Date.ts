import moment from 'moment';

export function formatElapsedDate(timestamp: number) {
  const now = moment();
  const then = moment(timestamp);
  const duration = moment.duration(moment().diff(then));

  if (duration.asSeconds() < 60) {
    return '방금';
  } else if (duration.asMinutes() < 60) {
    return `${duration.asMinutes().toFixed(0)}분 전`;
  } else if (duration.asHours() < 24) {
    return `${duration.asHours().toFixed(0)}시간 전`;
  } else if (duration.asDays() < 2) {
    return '어제';
  } else if (duration.asDays() < 7) {
    return `${then.format('dddd')}`;
  } else if (then.year() === now.year()) {
    return then.format('MM/DD');
  } else {
    return then.format('YY/MM/DD');
  }
}
