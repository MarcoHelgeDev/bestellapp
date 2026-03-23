const mobileCartBtn = document.getElementById('mobileCartBtn');
const basketWrapper = document.getElementById('basketWrapper');
const basketCloseBtn = document.getElementById('basketCloseBtn');
const basketBackdrop = document.getElementById('basketBackdrop');

function openBasket() {
  if (!basketWrapper) {
    return;
  }

  if (window.innerWidth > 1100) {
    return;
  }

  basketWrapper.classList.add('is-open');
  document.body.classList.add('basket-open');
}

function closeBasket() {
  if (!basketWrapper) {
    return;
  }

  basketWrapper.classList.remove('is-open');
  document.body.classList.remove('basket-open');
}

function toggleBasket() {
  if (!basketWrapper) {
    return;
  }

  if (basketWrapper.classList.contains('is-open')) {
    closeBasket();
  } else {
    openBasket();
  }
}

function handleBasketResize() {
  if (window.innerWidth > 1100) {
    closeBasket();
  }
}

if (mobileCartBtn) {
  mobileCartBtn.addEventListener('click', toggleBasket);
}

if (basketCloseBtn) {
  basketCloseBtn.addEventListener('click', closeBasket);
}

if (basketBackdrop) {
  basketBackdrop.addEventListener('click', closeBasket);
}

window.addEventListener('resize', handleBasketResize);
