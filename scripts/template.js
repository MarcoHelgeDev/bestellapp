function getCategorySliderLinkTemplate(category) {
  return /*html*/ `
    <a class="category-slider-link" href="#${category.sectionId}">
      ${category.title}
    </a>
  `;
}

function getCategorySubtitleTemplate(category) {
  if (!category.subtitle) {
    return '';
  }

  return `<span class="hide-section-headline">${category.subtitle}</span>`;
}

function getDishCardTemplate(dish) {
  return /*html*/ `
    <article class="meal-container">
      <img src="${dish.img}" alt="${dish.name}" />

      <div class="meal-content">
        <span class="meal-headline">${dish.name}</span>
        <p class="meal-info">${dish.description}</p>
      </div>
      <div class="price-and-btn">
        <span class="meal-price">${formatPrice(dish.price)}</span>
        <button class="add-btn" type="button" data-dish-id="${dish.id}">
          Add to basket
        </button>
      </div>
    </article>
  `;
}

function getMenuSectionTemplate(category) {
  let dishesHtml = '';

  for (let i = 0; i < category.dishes.length; i++) {
    dishesHtml += getDishCardTemplate(category.dishes[i]);
  }
  return /*html*/ `
    <section id="${category.sectionId}" aria-labelledby="${category.sectionId}-heading">
      <div class="meal-section-wrapper">
        <div class="meal-sandwich-headline" id="${category.sectionId}-heading">
          <div class="meal-word-group">
            <img class="meal-icon" src="${category.icon}" alt="${category.title} Icon" />
            <span class="meal-word">${category.title}</span>
          </div>
          ${getCategorySubtitleTemplate(category)}
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

function getBasketItemTemplate(item) {
  return /*html*/ `
    <article class="basket-item">
      <div class="basket-item-top">
        <span class="basket-item-name">${item.amount} x ${item.name}</span>
      </div>
      <div class="basket-item-bottom">
        <div class="basket-item-actions">
          <button
            class="basket-action basket-trash"
            type="button"
            data-basket-action="delete"
            data-dish-id="${item.id}"
            aria-label="${item.name} löschen"
          >
            <span class="delete-icon"></span>
          </button>
          <button
            class="basket-action"
            type="button"
            data-basket-action="decrease"
            data-dish-id="${item.id}"
            aria-label="Menge verringern"
          >
            -
          </button>
          <span class="basket-quantity">${item.amount}</span>
          <button
            class="basket-action"
            type="button"
            data-basket-action="increase"
            data-dish-id="${item.id}"
            aria-label="Menge erhöhen"
          >
            +
          </button>
        </div>
        <span class="basket-item-price">
          ${formatPrice(item.price * item.amount)}
        </span>
      </div>
    </article>
  `;
}

function getMinimumOrderHintTemplate(minimumOrder, missingAmount) {
  if (missingAmount <= 0) {
    return '';
  }

  return /*html*/ `
    <p class="basket-minimum-order-note">
      You are still ${formatPrice(missingAmount)} below the minimum order value of
      ${formatPrice(minimumOrder)}.
    </p>
  `;
}

function getBasketSummaryTemplate(
  subtotal,
  deliveryFee,
  total,
  minimumOrder,
  missingAmount,
) {
  let minimumOrderReached = missingAmount <= 0;

  return /*html*/ `
    <div class="basket-summary">
      <div class="basket-summary-row">
        <span>Subtotal</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="basket-summary-row">
        <span>Delivery fee</span>
        <span>${formatPrice(deliveryFee)}</span>
      </div>
      <div class="basket-summary-row basket-total-row">
        <span>Total</span>
        <span>${formatPrice(total)}</span>
      </div>
      ${getMinimumOrderHintTemplate(minimumOrder, missingAmount)}
      <button
        class="basket-buy-btn"
        type="button"
        data-basket-action="buy"
        ${minimumOrderReached ? '' : 'disabled'}
      >
        Buy now (${formatPrice(total)})
      </button>
    </div>
  `;
}

function getBasketFilledTemplate(
  itemsHtml,
  subtotal,
  deliveryFee,
  total,
  minimumOrder,
  missingAmount,
) {
  return /*html*/ `
    <div class="basket-items">
      ${itemsHtml}
    </div>
    ${getBasketSummaryTemplate(
      subtotal,
      deliveryFee,
      total,
      minimumOrder,
      missingAmount,
    )}
  `;
}
