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
    return this.#offers.find((offer) => offer.id === id);
  }
}
