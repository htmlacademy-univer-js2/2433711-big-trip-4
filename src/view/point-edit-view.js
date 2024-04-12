import { EMPTY_POINT } from '../const';
import { createElement } from '../render.js';
import { createPointEditTemplate } from '../template/point-edit-template.js';

export default class PointEditView {
  constructor({ point = EMPTY_POINT, pointDestination, pointOffers }) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createPointEditTemplate({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffers: this.pointOffers,
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
