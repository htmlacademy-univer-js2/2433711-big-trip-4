import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, replace } from '../framework/render.js';
import { filterContainer } from '../main.js';
import FilterView from '../view/filter-view.js';
import { isEventPast, isEventPresent, isEventFuture } from '../utils.js';
export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripPoints = [];
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #filteredPoints = {};
  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    render(this.#eventListComponent, this.#container);
    render(
      new FilterView(this.#filterPoints(this.#tripPoints)),
      filterContainer
    );
    if (this.#tripPoints.length === 0) {
      render(new NoPointView(), this.#eventListComponent.element);
      return;
    }

    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoints(
        this.#tripPoints[i],
        this.#destinationsModel.getDestinationById(
          this.#tripPoints[i].destination
        ),
        this.#offersModel.getOffersByType(this.#tripPoints[i].type)
      );
    }
  }

  #renderPoints(point, destination, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point: point,
      pointDestination: destination,
      pointOffers: offers,
      onEditClick: () => {
        document.addEventListener('keydown', escKeyDownHandler);
        replacePointToForm();
      },
    });
    const pointEditComponent = new PointEditView({
      point: point,
      pointDestination: this.#destinationsModel,
      pointOffers: this.#offersModel.getOffersByType(point.type),
      onFormSubmit: () => {
        document.removeEventListener('keydown', escKeyDownHandler);
        replaceFormToPoint();
      },
      OnCancelClick: () => {
        document.removeEventListener('keydown', escKeyDownHandler);
        replaceFormToPoint();
      },
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#eventListComponent.element);
  }

  #filterPoints(points) {
    this.#filteredPoints.everything = points;
    this.#filteredPoints.future = points.filter((point) =>
      isEventFuture(point.dateTo)
    );
    this.#filteredPoints.present = points.filter((point) =>
      isEventPresent(point.dateFrom, point.dateTo)
    );
    this.#filteredPoints.past = points.filter((point) =>
      isEventPast(point.dateFrom)
    );

    return this.#filteredPoints;
  }
}
