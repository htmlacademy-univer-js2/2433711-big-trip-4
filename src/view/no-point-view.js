import AbstractView from '../framework/view/abstract-view';
import { createNoPointTemplate } from '../template/no-point-template';

export default class NoPointView extends AbstractView {
  #filterType = null;
  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
