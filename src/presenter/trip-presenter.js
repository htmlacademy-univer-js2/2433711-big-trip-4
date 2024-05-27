import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { filterContainer } from '../main.js';
import FilterView from '../view/filter-view.js';
import PointPresenter from './point-presenter.js';
import {
  isEventPast,
  isEventPresent,
  isEventFuture,
  updateItem,
} from '../utils.js';
export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripPoints = [];
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #filteredPoints = {};
  #pointPresenters = new Map();
  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    render(
      new FilterView(this.#filterPoints(this.#tripPoints)),
      filterContainer
    );
  }

  #renderPointList() {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #renderBoard() {
    render(this.#eventListComponent, this.#container);

    if (this.#tripPoints.length === 0) {
      render(new NoPointView(), this.#eventListComponent.element);
      return;
    }
    this.#renderSort();
    this.#renderFilters();
    this.#renderPointList();
  }

  #renderPoint(point, destination, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, destination, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
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

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
