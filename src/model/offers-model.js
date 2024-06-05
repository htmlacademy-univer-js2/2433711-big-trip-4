export default class OffersModel {
  #offers = [];
  #offersApiService;
  constructor({ offersApiService }) {
    this.#offersApiService = offersApiService;
  }

  async init() {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers;
    } catch (err) {
      this.#offers = [];
    }
  }

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
