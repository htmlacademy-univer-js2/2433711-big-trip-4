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
