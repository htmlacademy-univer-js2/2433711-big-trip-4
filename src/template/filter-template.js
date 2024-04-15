/* eslint-disable indent */

const createFilter = (key, filteredPoint) =>
  `<div class="trip-filters__filter">
<input
  id="filter-${key}"
  class="trip-filters__filter-input  visually-hidden"
  type="radio"
  name="trip-filter"
  value="${key}" ${key === 'everything' ? 'checked' : ''}${
    filteredPoint.length !== 0 || key === 'everything' ? '' : 'disabled'
  }
/>
<label class="trip-filters__filter-label" for="filter-${key}">
  ${key[0].toUpperCase() + key.slice(1, key.length)}
</label>
</div>`;

export const createFilterTemplate = (filteredPoints) =>
  `<form class="trip-filters" action="#" method="get">
  ${Object.keys(filteredPoints)
    .map((key) => createFilter(key, filteredPoints[key]))
    .join('')}

    <button class="visually-hidden" type="submit">
      Accept filter
    </button>
  </form>`;
