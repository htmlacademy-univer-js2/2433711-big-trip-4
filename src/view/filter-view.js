import { createFilterTemplate } from '../template/filter-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;
  #filtersDisableState = null;
  constructor({
    filters,
    currentFilter,
    onFilterTypeChange,
    isFilterDisabled,
  }) {
    super();
    this.#filtersDisableState = isFilterDisabled;
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(
      this.#filters,
      this.#currentFilter,
      this.#filtersDisableState
    );
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
