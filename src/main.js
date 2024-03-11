import FilterView from './view/filter-view';
import TripInfoView from './view/trip-info-view';
import BoardPresenter from './presenter/board-presenter';

import { render, RenderPosition } from './render';

const filterComponent = document.querySelector('.trip-controls__filters');
const tripInfoComponent = document.querySelector('.trip-main');
const boardContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ container: boardContainer });

boardPresenter.init();

render(new FilterView(), filterComponent);
render(new TripInfoView(), tripInfoComponent, RenderPosition.AFTERBEGIN);
