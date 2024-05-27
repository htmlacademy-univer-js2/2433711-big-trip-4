import { EMPTY_POINT } from '../const';
import { createPointEditTemplate } from '../template/point-edit-template.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export default class PointEditView extends AbstractStatefulView {
  #pointDestinations;
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

    this.#pointDestinations = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleFormSubmit = onFormSubmit;
    this._setState(
      PointEditView.parsePointToState(point, pointDestination, pointOffers)
    );
    this.#handleCancelClick = OnCancelClick;
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestination: this.#pointDestinations,
      pointOffers: this.#pointOffers,
    });
  }

  #pointTypeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      basePrice: parseInt(evt.target.value, 10),
    });
  };

  #offersChangeHandler = () => {
    const selectedOffers = Array.from(
      this.element.querySelectorAll('.event__offer-checkbox:checked')
    ).map(({ id }) => id.split('-').slice(2));
    this._setState({
      offers: selectedOffers,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #formCancelHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: this.#pointDestinations.find(
        (destination) => destination.name === evt.target.value
      ).id,
    });
  };

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formCancelHandler);
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#pointTypeChangeHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offersChangeHandler);
  }

  static parsePointToState(point) {
    return {
      ...point,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}
