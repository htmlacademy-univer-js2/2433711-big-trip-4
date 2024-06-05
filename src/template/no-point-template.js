import { FilterType } from '../const';

const NoPointsTextType = {
  [FilterType.EVERYTHING]:
    'Click «ADD NEW POINT» in menu to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no points today',
  [FilterType.PAST]: 'There are no past events now',
};

export const createNoPointTemplate = (filterType) => {
  const noPointsTextValue = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${noPointsTextValue}</p>`;
};
