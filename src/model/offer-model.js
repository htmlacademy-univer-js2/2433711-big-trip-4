import { getOffers } from '../mock/offers';

export default class OfferModel {
  #offers = getOffers();

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type)?.offers;
  }

  getOffersById(id) {
    return this.#offers.filter((offer) => offer.id === id);
  }

  getOffersByTypeAndId(type, ids) {
    const typeOffers = this.#offers.find((offer) => offer.type === type).offers;
    const result = typeOffers.filter((offer) => ids.includes(offer.id));
    return result;
  }
}
