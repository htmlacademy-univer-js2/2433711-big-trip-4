export const CITIES = [
  'Athens',
  'Paris',
  'London',
  'Stockholm',
  'Warsaw',
  'Berlin',
  'Amsterdam',
];
export const TYPES = [
  'taxi',
  'flight',
  'bus',
  'train',
  'ship',
  'drive',
  'check-in',
  'sightseeing',
  'restaurant',
];
export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
];

export const PRICE = {
  min: 100,
  max: 10000,
};

export const OFFERS = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
];

export const EMPTY_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight',
};

export const DATES = [
  {
    from: new Date(2022, 3, 4, 18, 16),
    to: new Date(2022, 3, 5, 21, 16),
  },
  {
    from: new Date(2022, 3, 6, 18, 16),
    to: new Date(2022, 3, 7, 20, 16),
  },
  {
    from: new Date(2022, 3, 8, 18, 16),
    to: new Date(2022, 3, 9, 19, 16),
  },
  {
    from: new Date(2022, 3, 9, 15, 17),
    to: new Date(2022, 3, 10, 18, 12),
  },
  {
    from: new Date(2024, 4, 9, 15, 17),
    to: new Date(2024, 5, 28, 16, 17),
  },
  {
    from: new Date(2025, 4, 9, 15, 17),
    to: new Date(2025, 5, 28, 16, 17),
  },
];
export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};
export const SortType = {
  DEFAULT: 'default',
  PRICE_SORT: 'price-sort',
  DURATION_SORT: 'duration-sort',
};
export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
