import { createTripInfoTemplate } from '../template/trip-info-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class TripInfoView extends AbstractView {
  #tripInfoData;
  constructor({ tripInfoData }) {
    super();
    this.#tripInfoData = tripInfoData;
  }

  get template() {
    return createTripInfoTemplate(this.#tripInfoData);
  }
}
