import TripInfoView from './view/trip-info-view';
import BoardPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model';
import OffersModel from './model/offer-model';
import { render, RenderPosition } from './framework/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
export const filterContainer = document.querySelector(
  '.trip-controls__filters'
);
const tripInfoContainer = document.querySelector('.trip-main');
const boardContainer = document.querySelector('.trip-events');
const destinationsModel = new DestinationModel();
const offersModel = new OffersModel();
const pointsModel = new PointModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  container: boardContainer,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, boardContainer);

boardPresenter.init();
filterPresenter.init();
render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
