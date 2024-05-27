import { generatePoint } from '../mock/points.js';
import Observable from '../framework/observable.js';
const POINTS_COUNT = 8;

export default class PointModel extends Observable {
  #points;
  constructor() {
    super();
    this.#points = Array.from({ length: POINTS_COUNT }, generatePoint);
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Cant update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Cant delete unexisting task');
    }

    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  }
}
