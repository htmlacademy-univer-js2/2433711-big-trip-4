import { DESCRIPTIONS, CITIES } from '../const.js';
import { getRandomArrayElement, getRandomInt } from '../utils';

const getPicture = () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInt(0, 1000)}`,
  description: getRandomArrayElement(DESCRIPTIONS),
});

const getDestination = (destination, index) => ({
  id: index,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: destination,
  pictures: Array.from({ length: getRandomInt(0, 5) }, getPicture),
});

const destinations = CITIES.map((city, index) => getDestination(city, index));

export const getRandomDestination = () => getRandomArrayElement(destinations);
export const getDestinations = () => destinations;
