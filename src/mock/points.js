import { getRandomArrayElement, getRandomInt } from '../utils.js';
import { PRICE, TYPES, DATES } from '../const.js';
import { getOffersWithExactPointType } from './offers.js';
import { getRandomDestination } from './destination.js';
const generatePoint = () => {
  const pointId = crypto.randomUUID();
  const date = getRandomArrayElement(DATES);
  const pointType = getRandomArrayElement(TYPES);
  const offersByCurrentPointType = getOffersWithExactPointType(pointType);

  return {
    id: pointId,
    basePrice: getRandomInt(PRICE.min, PRICE.max),
    dateFrom: date.from,
    dateTo: date.to,
    destination: getRandomDestination().id,
    isFavourite: Boolean(getRandomInt(0, 2)),
    offers: offersByCurrentPointType.map((offer) => offer.id),
    type: pointType,
  };
};
export { generatePoint };
