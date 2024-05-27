import { OFFERS, PRICE, TYPES } from '../const.js';
import { getRandomInt, getRandomArrayElement } from '../utils.js';

const generateOffer = () => ({
  id: crypto.randomUUID(),
  title: getRandomArrayElement(OFFERS),
  price: getRandomInt(PRICE.min, PRICE.max),
});

const offersByType = TYPES.map((type) => ({
  type,
  offers: Array.from({ length: getRandomInt(0, OFFERS.length) }, generateOffer),
}));
export const getOffersWithExactPointType = (type) =>
  offersByType.find((offer) => type === offer.type).offers;
export const getRandomOffer = () => getRandomArrayElement(offersByType);
export const getOffers = () => offersByType;
