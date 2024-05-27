import dayjs from 'dayjs';

export const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export function getDuration(startTime, endTime) {
  const days = dayjs(endTime).diff(dayjs(startTime), 'days');
  const hours = dayjs(endTime).diff(dayjs(startTime), 'hours') % 24;
  const minutes = dayjs(endTime).diff(dayjs(startTime), 'minute') % 60;
  const formatDays = days !== 0 ? `${days}D ` : '';
  const formatHours = hours !== 0 ? `${hours}H ` : '';
  const formatMinutes = minutes !== 0 ? `${minutes}M` : '';
  return formatDays + formatHours + formatMinutes;
}
export function sortPointsByDuration(pointA, pointB) {
  const pointAMinutes = dayjs(pointA.dateTo).diff(
    dayjs(pointA.dateFrom),
    'minute'
  );
  const pointBMinutes = dayjs(pointB.dateTo).diff(
    dayjs(pointB.dateFrom),
    'minute'
  );
  const diff = pointAMinutes - pointBMinutes;
  if (diff > 0) {
    return -1;
  } else if (diff < 0) {
    return 1;
  }
  return 0;
}

export function sortPointsByPrice(pointA, pointB) {
  const diff = pointA.basePrice - pointB.basePrice;
  if (diff > 0) {
    return -1;
  } else if (diff < 0) {
    return 1;
  }
  return 0;
}

export const updateItem = (items, update) =>
  items.map((item) => (item.id === update.id ? update : item));

export const isEventPresent = (dateFrom, dateTo) =>
  dayjs().diff(dateFrom) > 0 && dayjs().diff(dateTo) < 0;
export const isEventPast = (dateTo) => dayjs().diff(dateTo) > 0;
export const isEventFuture = (dateFrom) => dayjs().diff(dateFrom) < 0;
