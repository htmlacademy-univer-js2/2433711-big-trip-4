import { generatePoint } from '../mock/points.js';

const POINTS_COUNT = 5;

export default class PointModel {
  constructor() {
    this.points = Array.from({ length: POINTS_COUNT }, generatePoint);
  }

  getPoints() {
    return this.points;
  }
}
