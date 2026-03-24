function getCategorySliderLinkTemplate(sectionId, title) {
  return /*html*/ `
    <a class="category-slider-link" href="#${sectionId}">
      ${title}
    </a>
  `;
}

function getDishCardTemplate(dishId, img, name, description, priceText) {
  return /*html*/ `
    <article class="meal-container">
      <img src="${img}" alt="${name}" />
      <div class="meal-content">
        <span class="meal-headline">${name}</span>
        <p class="meal-info">${description}</p>
      </div>
      <div class="price-and-btn">
        <span class="meal-price">${priceText}</span>
        <button class="add-btn" type="button" data-dish-id="${dishId}">
          Add to basket
        </button>
      </div>
    </article>
  `;
}

function getMenuSectionTemplate(
  sectionId,
  headingId,
  icon,
  title,
  subtitleHtml,
  dishesHtml,
) {
  return /*html*/ `
    <section id="${sectionId}" aria-labelledby="${headingId}">
      <div class="meal-section-wrapper">
        <div class="meal-sandwich-headline" id="${headingId}">
          <div class="meal-word-group">
            <img class="meal-icon" src="${icon}" alt="${title} Icon" />
            <span class="meal-word">${title}</span>
          </div>
          ${subtitleHtml}
        </div>
      </div>
      <div class="meal-content-wrapper">
        ${dishesHtml}
      </div>
    </section>
  `;
}

function getBasketEmptyTemplate() {
  return /*html*/ `
    <div class="basket-empty-state">
      <p class="basket-empty-text">
        Nothing here yet.<br />
        Go ahead and choose something delicious!
      </p>
      <img
        class="basket-empty-img"
        src="./assets/icons/shopping_cart.svg"
        alt="Leerer Warenkorb"
      />
    </div>
  `;
}

function getBasketItemTemplate(dishId, name, amount, totalPriceText) {
  return /*html*/ `
    <article class="basket-item">
      <div class="basket-item-top">
        <span class="basket-item-name">${amount} x ${name}</span>
      </div>
      <div class="basket-item-bottom">
        <div class="basket-item-actions">
          <button
            class="basket-action basket-trash"
            type="button"
            data-basket-action="delete"
            data-dish-id="${dishId}"
            aria-label="${name} löschen"
          >
            <span class="delete-icon"></span>
          </button>
          <button
            class="basket-action"
            type="button"
            data-basket-action="decrease"
            data-dish-id="${dishId}"
            aria-label="Menge verringern"
          >
            -
          </button>
          <span class="basket-quantity">${amount}</span>
          <button
            class="basket-action"
            type="button"
            data-basket-action="increase"
            data-dish-id="${dishId}"
            aria-label="Menge erhöhen"
          >
            +
          </button>
        </div>
        <span class="basket-item-price">
          ${totalPriceText}
        </span>
      </div>
    </article>
  `;
}

function getBasketSummaryTemplate(
  subtotalText,
  deliveryFeeText,
  totalText,
  minimumOrderHintHtml,
  buyButtonDisabled,
) {
  return /*html*/ `
    <div class="basket-summary">
      <div class="basket-summary-row">
        <span>Subtotal</span>
        <span>${subtotalText}</span>
      </div>
      <div class="basket-summary-row">
        <span>Delivery fee</span>
        <span>${deliveryFeeText}</span>
      </div>
      <div class="basket-summary-row basket-total-row">
        <span>Total</span>
        <span>${totalText}</span>
      </div>
      ${minimumOrderHintHtml}
      <button
        class="basket-buy-btn"
        type="button"
        data-basket-action="buy"
        ${buyButtonDisabled}
      >
        Buy now (${totalText})
      </button>
    </div>
  `;
}

function getBasketFilledTemplate(itemsHtml, summaryHtml) {
  return /*html*/ `
    <div class="basket-items">
      ${itemsHtml}
    </div>
    ${summaryHtml}
  `;
}
