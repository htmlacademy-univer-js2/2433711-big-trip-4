import { createSortTemplate } from '../template/sort-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView {
  #handleSortTypeChange;
  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
