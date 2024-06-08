export const createTripInfoTemplate = (tripInfoData) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfoData.tripPath}</h1>
      <p class="trip-info__dates">${tripInfoData.tripDate}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripInfoData.price}</span>
    </p>
  </section>`;
