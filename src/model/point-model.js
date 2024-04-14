import { generatePoint } from '../mock/points.js';

const POINTS_COUNT = 5;

export default class PointModel {
  #points;
  constructor() {
    this.#points = Array.from({ length: POINTS_COUNT }, generatePoint);
  }

  get points() {
    return this.#points;
  }
}
