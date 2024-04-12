import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

import { render } from '../render.js';
export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();
  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    render(
      new PointEditView({
        point: this.tripPoints[0],
        pointDestination: this.destinationsModel.getDestinations(),
        pointOffers: this.offersModel.getOffersByType(this.tripPoints[0].type),
      }),
      this.eventListComponent.getElement()
    );
    for (let i = 1; i < this.tripPoints.length; i++) {
      render(
        new PointView({
          point: this.tripPoints[i],
          pointDestination: this.destinationsModel.getDestinationById(
            this.tripPoints[i].destination
          ),
          pointOffers: this.offersModel.getOffersByType(
            this.tripPoints[i].type
          ),
        }),
        this.eventListComponent.getElement()
      );
    }
  }
}
