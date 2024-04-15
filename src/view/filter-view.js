import { createFilterTemplate } from '../template/filter-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filteredPoints = null;
  constructor(filteredPoints) {
    super();
    this.#filteredPoints = filteredPoints;
  }

  get template() {
    return createFilterTemplate(this.#filteredPoints);
  }
}
