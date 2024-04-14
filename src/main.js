import FilterView from './view/filter-view';
import TripInfoView from './view/trip-info-view';
import BoardPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model';
import OffersModel from './model/offer-model';
import { render, RenderPosition } from './framework/render.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripInfoContainer = document.querySelector('.trip-main');
const boardContainer = document.querySelector('.trip-events');
const destinationsModel = new DestinationModel();
const offersModel = new OffersModel();
const pointsModel = new PointModel();
const boardPresenter = new BoardPresenter({
  container: boardContainer,
  pointsModel,
  offersModel,
  destinationsModel,
});
boardPresenter.init();

render(new FilterView(), filterContainer);
render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
