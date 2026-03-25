const menuContent = document.getElementById('menuContent');
const categorySlider = document.getElementById('categorySlider');
const basketContent = document.getElementById('basketContent');
const mobileCartCount = document.getElementById('mobileCartCount');
const orderDialog = document.getElementById('orderDialog');
const orderDialogCloseBtn = document.getElementById('orderDialogCloseBtn');

const basketStorageKey = 'burgerHouseBasket';

let basket = [];

function init() {
  loadBasketFromLocalStorage();
  renderCategorySlider();
  renderMenu();
  renderBasket();
  addAppEventListeners();
}

function addAppEventListeners() {
  menuContent.addEventListener('click', handleMenuClick);
  basketContent.addEventListener('click', handleBasketClick);
  orderDialog.addEventListener('click', handleDialogBackdropClick);
  orderDialogCloseBtn.addEventListener('click', closeOrderDialog);
}

function renderCategorySlider() {
  let html = '';

  for (let i = 0; i < restaurantData.categories.length; i++) {
    let category = restaurantData.categories[i];
    html += getCategorySliderLinkTemplate(category.sectionId, category.title);
  }

  categorySlider.innerHTML = html;
}

function renderMenu() {
  let html = '';

  for (let i = 0; i < restaurantData.categories.length; i++) {
    html += getMenuSectionHtml(restaurantData.categories[i]);
  }

  menuContent.innerHTML = html;
}

function getMenuSectionHtml(category) {
  let headingId = category.sectionId + '-heading';
  let subtitleHtml = getCategorySubtitleHtml(category.subtitle);
  let dishesHtml = getDishesHtml(category.dishes);

  return getMenuSectionTemplate(
    category.sectionId,
    headingId,
    category.icon,
    category.title,
    subtitleHtml,
    dishesHtml,
  );
}

function getCategorySubtitleHtml(subtitle) {
  if (!subtitle) {
    return '';
  }

  return `<span class="hide-section-headline">${subtitle}</span>`;
}

function getDishesHtml(dishes) {
  let html = '';

  for (let i = 0; i < dishes.length; i++) {
    let dish = dishes[i];
    html += getDishCardTemplate(
      dish.id,
      dish.img,
      dish.name,
      dish.description,
      formatPrice(dish.price),
    );
  }

  return html;
}

function renderBasket() {
  saveBasketToLocalStorage();
  updateDishButtons();
  updateMobileCartCount();

  let basketItemsRef = basketContent.querySelector('.basket-items');
  let basketScrollTop = 0;

  if (basketItemsRef) {
    basketScrollTop = basketItemsRef.scrollTop;
  }

  if (basket.length === 0) {
    basketContent.classList.add('basket-content-empty');
    basketContent.innerHTML = getBasketEmptyTemplate();
    return;
  }

  basketContent.classList.remove('basket-content-empty');
  basketContent.innerHTML = getBasketFilledTemplate(
    getBasketItemsHtml(),
    getBasketSummaryHtml(),
  );

  let newBasketItemsRef = basketContent.querySelector('.basket-items');

  if (newBasketItemsRef) {
    newBasketItemsRef.scrollTop = basketScrollTop;
  }
}

function getBasketItemsHtml() {
  let html = '';

  for (let i = 0; i < basket.length; i++) {
    let item = basket[i];
    html += getBasketItemTemplate(
      item.id,
      item.name,
      item.amount,
      formatPrice(item.price * item.amount),
    );
  }

  return html;
}

function getBasketSummaryHtml() {
  let subtotal = getSubtotal();
  let deliveryFee = getDeliveryFee();
  let total = subtotal + deliveryFee;
  let minimumOrder = restaurantData.minimumOrder;
  let missingAmount = minimumOrder - subtotal;
  let minimumOrderHintHtml = getMinimumOrderHintHtml(
    minimumOrder,
    missingAmount,
  );
  let buyButtonDisabled = getBuyButtonDisabledAttribute(missingAmount);

  return getBasketSummaryTemplate(
    formatPrice(subtotal),
    formatPrice(deliveryFee),
    formatPrice(total),
    minimumOrderHintHtml,
    buyButtonDisabled,
  );
}

function getMinimumOrderHintHtml(minimumOrder, missingAmount) {
  if (missingAmount <= 0) {
    return '';
  }

  return `
    <p class="basket-minimum-order-note">
      You are still ${formatPrice(missingAmount)} below the minimum order value of
      ${formatPrice(minimumOrder)}.
    </p>
  `;
}

function getBuyButtonDisabledAttribute(missingAmount) {
  if (missingAmount > 0) {
    return 'disabled';
  }

  return '';
}

function handleMenuClick(event) {
  const addButton = event.target.closest('.add-btn');

  if (!addButton) {
    return;
  }

  addToBasket(addButton.dataset.dishId);
}

function handleBasketClick(event) {
  const actionButton = event.target.closest('[data-basket-action]');

  if (!actionButton) {
    return;
  }

  const action = actionButton.dataset.basketAction;
  const dishId = actionButton.dataset.dishId;

  if (action === 'buy') {
    placeOrder();
  } else if (action === 'increase') {
    increaseAmount(dishId);
  } else if (action === 'decrease') {
    decreaseAmount(dishId);
  } else if (action === 'delete') {
    removeFromBasket(dishId);
  }
}

function addToBasket(dishId) {
  let basketItem = getBasketItemByDishId(dishId);

  if (basketItem) {
    basketItem.amount++;
  } else {
    let dish = getDishById(dishId);
    basket.push(getNewBasketItem(dish));
  }

  renderBasket();
}

function getNewBasketItem(dish) {
  return {
    id: dish.id,
    name: dish.name,
    price: dish.price,
    amount: 1,
  };
}

function increaseAmount(dishId) {
  let basketItem = getBasketItemByDishId(dishId);

  if (!basketItem) {
    return;
  }

  basketItem.amount++;
  renderBasket();
}

function decreaseAmount(dishId) {
  let basketItem = getBasketItemByDishId(dishId);

  if (!basketItem) {
    return;
  }

  if (basketItem.amount === 1) {
    removeFromBasket(dishId);
    return;
  }

  basketItem.amount--;
  renderBasket();
}

function removeFromBasket(dishId) {
  let basketItemIndex = getBasketItemIndex(dishId);

  if (basketItemIndex === -1) {
    return;
  }

  basket.splice(basketItemIndex, 1);
  renderBasket();
}

function placeOrder() {
  if (basket.length === 0) {
    return;
  }

  if (!isMinimumOrderReached()) {
    return;
  }

  basket = [];
  renderBasket();
  closeBasket();
  showOrderDialog();
}

function showOrderDialog() {
  if (orderDialog.open) {
    return;
  }

  orderDialog.showModal();
}

function closeOrderDialog() {
  if (orderDialog.open) {
    orderDialog.close();
  }
}

function handleDialogBackdropClick(event) {
  if (event.target === orderDialog) {
    closeOrderDialog();
  }
}

function updateDishButtons() {
  const addButtons = document.querySelectorAll('.add-btn');

  for (let i = 0; i < addButtons.length; i++) {
    updateDishButton(addButtons[i]);
  }
}

function updateDishButton(button) {
  let dishId = button.dataset.dishId;
  let amount = getBasketAmountByDishId(dishId);

  if (amount === 0) {
    button.textContent = 'Add to basket';
    button.classList.remove('is-added');
  } else {
    button.textContent = 'Added ' + amount;
    button.classList.add('is-added');
  }
}

function getBasketAmountByDishId(dishId) {
  let basketItem = getBasketItemByDishId(dishId);

  if (!basketItem) {
    return 0;
  }

  return basketItem.amount;
}

function getBasketItemByDishId(dishId) {
  let basketItemIndex = getBasketItemIndex(dishId);

  if (basketItemIndex === -1) {
    return null;
  }

  return basket[basketItemIndex];
}

function getBasketItemIndex(dishId) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === dishId) {
      return i;
    }
  }

  return -1;
}

function getDishById(dishId) {
  for (let i = 0; i < restaurantData.categories.length; i++) {
    let category = restaurantData.categories[i];

    for (let j = 0; j < category.dishes.length; j++) {
      if (category.dishes[j].id === dishId) {
        return category.dishes[j];
      }
    }
  }
}

function getSubtotal() {
  let subtotal = 0;

  for (let i = 0; i < basket.length; i++) {
    subtotal += basket[i].price * basket[i].amount;
  }

  return subtotal;
}

function getDeliveryFee() {
  if (basket.length === 0) {
    return 0;
  }

  return restaurantData.deliveryFee;
}

function isMinimumOrderReached() {
  return getSubtotal() >= restaurantData.minimumOrder;
}

function getBasketItemCount() {
  let itemCount = 0;

  for (let i = 0; i < basket.length; i++) {
    itemCount += basket[i].amount;
  }

  return itemCount;
}

function updateMobileCartCount() {
  let itemCount = getBasketItemCount();

  mobileCartCount.textContent = itemCount;

  if (itemCount === 0) {
    mobileCartCount.classList.add('is-hidden');
  } else {
    mobileCartCount.classList.remove('is-hidden');
  }
}

function saveBasketToLocalStorage() {
  localStorage.setItem(basketStorageKey, JSON.stringify(basket));
}

function loadBasketFromLocalStorage() {
  let savedBasket = localStorage.getItem(basketStorageKey);

  if (!savedBasket) {
    return;
  }

  try {
    basket = JSON.parse(savedBasket);
  } catch (error) {
    basket = [];
  }
}

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + ' €';
}

init();
