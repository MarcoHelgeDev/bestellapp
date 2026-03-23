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
    html += getCategorySliderLinkTemplate(restaurantData.categories[i]);
  }

  categorySlider.innerHTML = html;
}

function renderMenu() {
  let html = '';

  for (let i = 0; i < restaurantData.categories.length; i++) {
    html += getMenuSectionTemplate(restaurantData.categories[i]);
  }

  menuContent.innerHTML = html;
}

function renderBasket() {
  saveBasketToLocalStorage();
  updateDishButtons();
  updateMobileCartCount();

  if (basket.length === 0) {
    basketContent.classList.add('basket-content-empty');
    basketContent.innerHTML = getBasketEmptyTemplate();
    return;
  }

  let itemsHtml = '';
  let subtotal = getSubtotal();
  let deliveryFee = getDeliveryFee();
  let total = subtotal + deliveryFee;
  let minimumOrder = restaurantData.minimumOrder;
  let missingAmount = minimumOrder - subtotal;

  for (let i = 0; i < basket.length; i++) {
    itemsHtml += getBasketItemTemplate(basket[i]);
  }

  basketContent.classList.remove('basket-content-empty');
  basketContent.innerHTML = getBasketFilledTemplate(
    itemsHtml,
    subtotal,
    deliveryFee,
    total,
    minimumOrder,
    missingAmount,
  );
}

function handleMenuClick(event) {
  const addButton = event.target.closest('.add-btn');

  if (!addButton) {
    return;
  }

  const dishId = addButton.dataset.dishId;
  addToBasket(dishId);
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
  let basketItemIndex = getBasketItemIndex(dishId);

  if (basketItemIndex !== -1) {
    basket[basketItemIndex].amount++;
  } else {
    let dish = getDishById(dishId);

    basket.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      amount: 1,
    });
  }

  renderBasket();
}

function increaseAmount(dishId) {
  let basketItemIndex = getBasketItemIndex(dishId);

  if (basketItemIndex === -1) {
    return;
  }

  basket[basketItemIndex].amount++;
  renderBasket();
}

function decreaseAmount(dishId) {
  let basketItemIndex = getBasketItemIndex(dishId);

  if (basketItemIndex === -1) {
    return;
  }

  if (basket[basketItemIndex].amount === 1) {
    removeFromBasket(dishId);
    return;
  }

  basket[basketItemIndex].amount--;
  renderBasket();
}

function removeFromBasket(dishId) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === dishId) {
      basket.splice(i, 1);
      break;
    }
  }

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
    let button = addButtons[i];
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
}

function getBasketAmountByDishId(dishId) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === dishId) {
      return basket[i].amount;
    }
  }

  return 0;
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
