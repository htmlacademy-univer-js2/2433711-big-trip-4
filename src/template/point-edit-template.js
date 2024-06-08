/* eslint-disable indent */
import dayjs from 'dayjs';
import { TYPES } from '../const';

const createEventItems = () =>
  TYPES.map(
    (type) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`
  ).join('');

const createEventList = (isDisabled) =>
  `<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${
    isDisabled ? 'disabled' : ''
  }>
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventItems()}
          </fieldset>
        </div>`;
const createDestinationList = (
  type,
  destination,
  allDestinations,
  isDisabled
) =>
  `<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-1">
    ${type}
  </label>
  <select class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" list="destination-list-1" ${
    isDisabled ? 'disabled' : ''
  }>
        <option  hidden></option>
        ${allDestinations
          .map(
            (city) =>
              `<option value="${city.name}" ${
                city.name === destination ? 'selected' : ''
              }>${city.name}</option>`
          )
          .join('')}

      </select>
  </div>`;

const createOfferList = (
  currentOffers,
  offersByType,
  isDisabled
) => `<div class="event__available-offers">
  ${offersByType
    .map(
      (offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${
    offer.id
  }" type="checkbox" name="event-offer-luggage" ${
        currentOffers.some((currentOffer) => currentOffer === offer.id)
          ? 'checked'
          : ''
      } ${isDisabled ? 'disabled' : ''}>
  <label class="event__offer-label" for="event-offer-${offer.id}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
  </div>`
    )
    .join('')}
</div>`;

const createPicturesSection = (pictures) =>
  pictures
    ? `<div class="event__photos-container">
<div class="event__photos-tape">
  ${pictures
    .map(
      (picture) =>
        `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
    )
    .join('')}
</div>
</div>`
    : '';
export const createPointEditTemplate = ({
  point,
  pointDestination,
  pointOffers,
}) => {
  const {
    basePrice,
    type,
    dateFrom,
    dateTo,
    destination,
    offers,
    isDisabled,
    isSaving,
    isDeleting,
  } = point;

  const offersOfThisType = pointOffers.find(
    (offer) => offer.type === type
  ).offers;
  const pointDest = pointDestination.find((d) => destination === d.id);
  const isSubmitDisabled = !destination || !dateFrom || !dateTo || !basePrice;
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
      ${createEventList(isDisabled)}
      </div>
      ${
        pointDest
          ? createDestinationList(
              type,
              pointDest.name,
              pointDestination,
              isDisabled
            )
          : createDestinationList(type, '', pointDestination, isDisabled)
      }
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${
          dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : ''
        }" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${
          dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : ''
        }" ${isDisabled ? 'disabled' : ''}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${
    isDisabled ? 'disabled' : ''
  }>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${
        isSubmitDisabled || isDisabled ? 'disabled' : ''
      }>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${
        isDisabled ? 'disabled' : ''
      }>${isDeleting ? 'Deleting...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    ${
      pointDest &&
      (offersOfThisType.length ||
        pointDest.description ||
        pointDest.pictures.length)
        ? `<section class="event__details">
      ${
        offersOfThisType.length && pointDest
          ? `
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">
              Offers
            </h3>
            ${createOfferList(offers, offersOfThisType, isDisabled)}
          </section>
          `
          : ''
      }
      ${
        pointDest?.description &&
        (pointDest.description || pointDest.pictures.length)
          ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">${
        pointDest.name
      }</h3>
      ${
        pointDest.description
          ? `<p class="event__destination-description">${pointDest.description}</p>`
          : ''
      }
      ${
        pointDest.pictures.length
          ? createPicturesSection(pointDest?.pictures)
          : ''
      }
    </section>`
          : ''
      }
      </section>`
        : ''
    }

  </form>
</li>`;
};
