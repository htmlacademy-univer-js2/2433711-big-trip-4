/* eslint-disable indent */
//filteredPoint.length !== 0 || key === 'everything' ? '' : 'disabled'
const createFilter = (filter, currentFilter) =>
  `<div class="trip-filters__filter">
<input
  id="filter-${filter.type}"
  class="trip-filters__filter-input  visually-hidden"
  type="radio"
  name="trip-filter"
  value="${filter.type}" ${filter.type === currentFilter ? 'checked' : ''}
/>
<label class="trip-filters__filter-label" for="filter-${filter.type}">
  ${filter.type[0].toUpperCase() + filter.type.slice(1, filter.type.length)}
</label>
</div>`;

export const createFilterTemplate = (filters, currentFilterType) =>
  `<form class="trip-filters" action="#" method="get">
  ${filters.map((filter) => createFilter(filter, currentFilterType)).join('')}

    <button class="visually-hidden" type="submit">
      Accept filter
    </button>
  </form>`;
