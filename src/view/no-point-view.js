import AbstractView from '../framework/view/abstract-view';
import { createNoPointTemplate } from '../template/no-point-template';
export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
