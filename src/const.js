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
    to: new Date(2024, 4, 25, 16, 17),
  },
];
export const FILTERS = ['Everything', 'Future', 'Present', 'Past'];
