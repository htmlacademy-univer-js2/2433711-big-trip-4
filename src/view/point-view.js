import { createPointTemplate } from '../template/point-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PointView extends AbstractView {
  #point;
  #pointDestination;
  #pointOffers;
  #handleEditClick = null;
  constructor({ point, pointDestination, pointOffers, onEditClick }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleEditClick = onEditClick;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers,
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
