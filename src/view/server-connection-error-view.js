import AbstractView from '../framework/view/abstract-view.js';
import { createServerConnectionErrorViewTemplate } from '../template/server-connection-error-template.js';

export default class ServerConnectionErrorView extends AbstractView {
  get template() {
    return createServerConnectionErrorViewTemplate();
  }
}
