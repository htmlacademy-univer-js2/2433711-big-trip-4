import dayjs from 'dayjs';

export const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export function getDuration(startTime, endTime) {
  const hours = dayjs(endTime).diff(dayjs(startTime), 'hours');
  const minutes = dayjs(endTime).diff(dayjs(startTime), 'minute') % 60;
  const formatHours = hours !== 0 ? `${hours}H ` : '';
  const formatMinutes = minutes !== 0 ? `${minutes}M` : '';
  return formatHours + formatMinutes;
}
