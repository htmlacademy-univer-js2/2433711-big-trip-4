import { EMPTY_POINT } from '../const';
import { createPointEditTemplate } from '../template/point-edit-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PointEditView extends AbstractView {
  #point;
  #pointDestination;
  #pointOffers;
  #handleFormSubmit = null;
  #handleCancelClick;
  constructor({
    point = EMPTY_POINT,
    pointDestination,
    pointOffers,
    onFormSubmit,
    OnCancelClick,
  }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = OnCancelClick;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formCancelHandler);
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createPointEditTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers,
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #formCancelHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };
}
