import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer;
  #point;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange;
  #destinationsModel = null;
  #offersModel = null;
  #handleModeChange;
  #mode = Mode.DEFAULT;
  constructor({
    pointListContainer,
    onDataChange,
    destinationsModel,
    offersModel,
    onModeChange,
  }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getDestinationById(
        this.#point.destination
      ),
      pointOffers: this.#offersModel.getOffersByTypeAndId(
        this.#point.type,
        this.#point.offers
      ),
      onEditClick: () => {
        document.addEventListener('keydown', this.#escKeyDownHandler);
        this.#replacePointToForm();
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });
    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getDestinationById(
        this.#point.destination
      ),
      pointOffers: this.#offersModel.getOffersByTypeAndId(
        this.#point.type,
        this.#point.offers
      ),
      onFormSubmit: () => {
        document.removeEventListener('keydown', this.#escKeyDownHandler);
        this.#replaceFormToPoint();
      },
      OnCancelClick: () => {
        document.removeEventListener('keydown', this.#escKeyDownHandler);
        this.#replaceFormToPoint();
      },
    });
    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }
}
