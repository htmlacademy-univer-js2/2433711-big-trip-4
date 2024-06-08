import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class OffersModel extends Observable {
  #offers = [];
  #offersApiService;
  constructor({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init() {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers;
    } catch (err) {
      this.#offers = [];
      this._notify(UpdateType.INIT, { isServerAvailable: false });
    }
  }

  get offers() {
    return this.#offers;
  }
}
