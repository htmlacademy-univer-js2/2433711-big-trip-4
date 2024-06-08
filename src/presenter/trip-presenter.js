import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {
  sortPointsByDuration,
  sortPointsByPrice,
  filterPoints,
  sortPointsByDay,
} from '../utils/utils.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ServerConnectionErrorView from '../view/server-connection-error-view.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class TripPresenter {
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DEFAULT;
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #sortComponent = null;
  #eventListComponent = new EventListView();
  #loadingComponent = new LoadingView();
  #errorComponent = new ServerConnectionErrorView();
  #pointPresenters = new Map();
  #noPointComponent = null;
  #newPointPresenter = null;
  #newPointButtonComponent = null;
  #isLoading = true;
  #isServerAvailable = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({
    newPointButtonComponent,
    container,
    pointsModel,
    offersModel,
    destinationsModel,
    filterModel,
    onNewPointDestroy,
  }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newPointButtonComponent = newPointButtonComponent;
    this.#newPointPresenter = new NewPointPresenter({
      taskListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      offersList: this.#offersModel,
      destinationsList: this.#destinationsModel,
    });

    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterPoints[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortPointsByDay);
      case SortType.DURATION_SORT:
        return filteredPoints.sort(sortPointsByDuration);

      case SortType.PRICE_SORT:
        return filteredPoints.sort(sortPointsByPrice);
    }
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType,
    });

    render(
      this.#noPointComponent,
      this.#eventListComponent.element,
      RenderPosition.AFTERBEGIN
    );
  }

  #renderPoint(point, destination, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, destination, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPointList(points) {
    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i]);
    }
  }

  #renderError() {
    render(this.#errorComponent, this.#container);
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (!this.#isServerAvailable) {
      this.#renderError();
      return;
    }
    render(this.#eventListComponent, this.#container);
    const points = this.points;
    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();

    this.#renderPointList(points);
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);
    remove(this.#loadingComponent);
    this.#newPointPresenter.destroy();
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        if (!data.isServerAvailable) {
          this.#isServerAvailable = false;
          this.#newPointButtonComponent.element.disabled = true;
        }
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#errorComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
